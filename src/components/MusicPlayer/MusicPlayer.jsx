import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './MusicPlayer.css'

const FADE_STEP_MS = 30
const FADE_DURATION_MS = 450

const getSavedPlayer = (storageKey) => {
	try {
		return JSON.parse(localStorage.getItem(storageKey) ?? '{}')
	} catch {
		return {}
	}
}

export const MusicPlayer = ({ artist, audioSrc, title, onPlayingChange }) => {
	const audioRef = useRef(null)
	const fadeRef = useRef(null)
	const { pathname } = useLocation()
	const storageKey = `music-player-${title}`
	const [savedPlayer] = useState(() => getSavedPlayer(storageKey))
	const savedVolume = Number.isFinite(savedPlayer.volume) ? savedPlayer.volume : 0.75
	const initialVolumeRef = useRef(savedVolume)
	const isPlayingRef = useRef(false)
	const volumeRef = useRef(savedVolume)
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(savedVolume)

	const savePlayerState = useCallback(
		(state) => {
			const audio = audioRef.current

			localStorage.setItem(
				storageKey,
				JSON.stringify({
					currentTime: audio?.currentTime ?? savedPlayer.currentTime ?? 0,
					isPlaying: isPlayingRef.current,
					volume: volumeRef.current,
					...state,
				}),
			)
		},
		[savedPlayer.currentTime, storageKey],
	)

	const fadeVolumeTo = useCallback((targetVolume, onComplete) => {
		const audio = audioRef.current

		if (!audio) return

		clearInterval(fadeRef.current)

		const startVolume = audio.volume
		const steps = Math.max(1, FADE_DURATION_MS / FADE_STEP_MS)
		const volumeStep = (targetVolume - startVolume) / steps
		let currentStep = 0

		fadeRef.current = setInterval(() => {
			currentStep += 1
			const nextVolume = startVolume + volumeStep * currentStep
			audio.volume = Math.min(1, Math.max(0, nextVolume))

			if (currentStep >= steps) {
				clearInterval(fadeRef.current)
				audio.volume = targetVolume
				onComplete?.()
			}
		}, FADE_STEP_MS)
	}, [])

	const handleTogglePlay = async () => {
		const audio = audioRef.current

		if (!audio) return

		if (isPlaying) {
			fadeVolumeTo(0, () => {
				audio.pause()
				audio.volume = volume
				setIsPlaying(false)
				onPlayingChange?.(false)
				isPlayingRef.current = false
				savePlayerState({ isPlaying: false })
			})
			return
		}

		audio.volume = 0

		try {
			await audio.play()
			setIsPlaying(true)
			onPlayingChange?.(true)
			isPlayingRef.current = true
			savePlayerState({ isPlaying: true })
			fadeVolumeTo(volume)
		} catch {
			audio.volume = volume
			setIsPlaying(false)
			onPlayingChange?.(false)
			isPlayingRef.current = false
			savePlayerState({ isPlaying: false })
		}
	}

	const handleVolumeChange = (event) => {
		const nextVolume = Number(event.target.value)
		const audio = audioRef.current

		setVolume(nextVolume)
		volumeRef.current = nextVolume

		if (audio) {
			audio.volume = nextVolume
		}

		savePlayerState({ volume: nextVolume })
	}

	useEffect(() => {
		const audio = audioRef.current

		if (!audio) return undefined

		audio.currentTime = Number.isFinite(savedPlayer.currentTime)
			? savedPlayer.currentTime
			: 0
		audio.volume = initialVolumeRef.current

		const saveCurrentTime = () => {
			savePlayerState({ currentTime: audio.currentTime })
		}

		const handleEnded = () => {
			setIsPlaying(false)
			onPlayingChange?.(false)
			isPlayingRef.current = false
			savePlayerState({ currentTime: 0, isPlaying: false })
		}

		audio.addEventListener('timeupdate', saveCurrentTime)
		audio.addEventListener('ended', handleEnded)

		if (savedPlayer.isPlaying) {
			audio.volume = 0
			audio
				.play()
				.then(() => {
					setIsPlaying(true)
					onPlayingChange?.(true)
					isPlayingRef.current = true
					fadeVolumeTo(initialVolumeRef.current)
				})
				.catch(() => {
					audio.volume = initialVolumeRef.current
					setIsPlaying(false)
					onPlayingChange?.(false)
					isPlayingRef.current = false
					savePlayerState({ isPlaying: false })
				})
		}

		return () => {
			clearInterval(fadeRef.current)
			savePlayerState({
				currentTime: audio.currentTime,
				isPlaying: isPlayingRef.current,
				volume: volumeRef.current,
			})
			audio.removeEventListener('timeupdate', saveCurrentTime)
			audio.removeEventListener('ended', handleEnded)
		}
	}, [
		fadeVolumeTo,
		onPlayingChange,
		savePlayerState,
		savedPlayer.currentTime,
		savedPlayer.isPlaying,
	])

	return (
		<section
			className={`music-player${pathname === '/' ? ' music-player--home' : ''}`}
			aria-label={`${title} player`}
		>
			<audio ref={audioRef} src={audioSrc} preload="metadata" />

			<div className="music-player__controls">
				<div className="music-player__info">
					<strong>{title}</strong>
					<span>{artist}</span>
				</div>

				<div className="music-player__actions" aria-label="Playback controls">
					<button
						className="player-control"
						type="button"
						disabled
						aria-label="Previous blocked"
					>
						<SkipBack size={20} strokeWidth={2.2} />
					</button>

					<button
						className={`player-control player-control--main${isPlaying ? ' is-playing' : ''}`}
						type="button"
						aria-label={isPlaying ? 'Pause' : 'Play'}
						aria-pressed={isPlaying}
						onClick={handleTogglePlay}
					>
						{isPlaying ? (
							<Pause size={24} fill="currentColor" />
						) : (
							<Play size={24} fill="currentColor" />
						)}
					</button>

					<button
						className="player-control"
						type="button"
						disabled
						aria-label="Next blocked"
					>
						<SkipForward size={20} strokeWidth={2.2} />
					</button>
				</div>

				<label className="music-player__volume">
					<Volume2 size={18} strokeWidth={2.1} />
					<span>Volume</span>
					<input
						aria-label="Volume"
						max="1"
						min="0"
						onChange={handleVolumeChange}
						step="0.01"
						type="range"
						value={volume}
					/>
				</label>
			</div>
		</section>
	)
}

MusicPlayer.propTypes = {
	artist: PropTypes.string.isRequired,
	audioSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onPlayingChange: PropTypes.func,
}
