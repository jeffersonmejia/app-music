import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/theme'
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

export const MusicPlayer = ({
	canPlayNext,
	canPlayPrevious,
	onNextTrack,
	onPlayingChange,
	onPreviousTrack,
	track,
}) => {
	const audioRef = useRef(null)
	const audioContextRef = useRef(null)
	const fadeRef = useRef(null)
	const gainNodeRef = useRef(null)
	const sourceNodeRef = useRef(null)
	const { pathname } = useLocation()
	const storageKey = `music-player-${track.id}`
	const initialSavedPlayer = getSavedPlayer(storageKey)
	const savedVolume = Number.isFinite(initialSavedPlayer.volume)
		? initialSavedPlayer.volume
		: 0.75
	const isPlayingRef = useRef(false)
	const outputVolumeRef = useRef(savedVolume)
	const storageKeyRef = useRef(storageKey)
	const volumeRef = useRef(savedVolume)
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(savedVolume)
	const { isDarkMode, setDarkMode } = useTheme()

	const savePlayerState = useCallback(
		(state) => {
			const audio = audioRef.current

			localStorage.setItem(
				storageKeyRef.current,
				JSON.stringify({
					currentTime: audio?.currentTime ?? 0,
					isPlaying: isPlayingRef.current,
					volume: volumeRef.current,
					...state,
				}),
			)
		},
		[],
	)

	const ensureAudioGraph = useCallback(async () => {
		const audio = audioRef.current
		const AudioContext = window.AudioContext || window.webkitAudioContext

		if (!audio || !AudioContext) {
			return false
		}

		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext()
		}

		if (!sourceNodeRef.current) {
			sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audio)
			gainNodeRef.current = audioContextRef.current.createGain()
			gainNodeRef.current.gain.value = outputVolumeRef.current
			sourceNodeRef.current.connect(gainNodeRef.current)
			gainNodeRef.current.connect(audioContextRef.current.destination)
		}

		if (audioContextRef.current.state === 'suspended') {
			await audioContextRef.current.resume()
		}

		return true
	}, [])

	const setOutputVolume = useCallback((nextVolume) => {
		const audio = audioRef.current
		const safeVolume = Math.min(1, Math.max(0, nextVolume))

		outputVolumeRef.current = safeVolume

		if (gainNodeRef.current && audioContextRef.current) {
			gainNodeRef.current.gain.setValueAtTime(
				safeVolume,
				audioContextRef.current.currentTime,
			)
		}

		if (audio) {
			audio.volume = gainNodeRef.current ? 1 : safeVolume
		}
	}, [])

	const fadeVolumeTo = useCallback((targetVolume, onComplete) => {
		const audio = audioRef.current

		if (!audio) return

		clearInterval(fadeRef.current)

		const startVolume = outputVolumeRef.current
		const steps = Math.max(1, FADE_DURATION_MS / FADE_STEP_MS)
		const volumeStep = (targetVolume - startVolume) / steps
		let currentStep = 0

		fadeRef.current = setInterval(() => {
			currentStep += 1
			const nextVolume = startVolume + volumeStep * currentStep
			setOutputVolume(nextVolume)

			if (currentStep >= steps) {
				clearInterval(fadeRef.current)
				setOutputVolume(targetVolume)
				onComplete?.()
			}
		}, FADE_STEP_MS)
	}, [setOutputVolume])

	const handleTogglePlay = async (event) => {
		const audio = audioRef.current
		const playButton = event.currentTarget

		if (!audio) return

		if (isPlaying) {
			fadeVolumeTo(0, () => {
				audio.pause()
				setOutputVolume(volume)
				setIsPlaying(false)
				onPlayingChange?.(false)
				isPlayingRef.current = false
				savePlayerState({ isPlaying: false })
			})
			return
		}

		await ensureAudioGraph()
		setOutputVolume(0)

		try {
			await audio.play()
			if (!isDarkMode) {
				const rect = playButton.getBoundingClientRect()
				setDarkMode(true, {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2,
				})
			}
			setIsPlaying(true)
			onPlayingChange?.(true)
			isPlayingRef.current = true
			savePlayerState({ isPlaying: true })
			fadeVolumeTo(volume)
		} catch {
			setOutputVolume(volume)
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

		clearInterval(fadeRef.current)

		if (audio) {
			setOutputVolume(nextVolume)
		}

		savePlayerState({ volume: nextVolume })
	}

	useEffect(() => {
		const audio = audioRef.current

		if (!audio) return undefined

		clearInterval(fadeRef.current)

		const savedTrackState = getSavedPlayer(storageKey)
		storageKeyRef.current = storageKey
		audio.currentTime = Number.isFinite(savedTrackState.currentTime)
			? savedTrackState.currentTime
			: 0
		setOutputVolume(volumeRef.current)

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

		if (savedTrackState.isPlaying || isPlayingRef.current) {
			ensureAudioGraph().then(() => {
				setOutputVolume(0)
			})
			audio
				.play()
				.then(() => {
					setIsPlaying(true)
					onPlayingChange?.(true)
					isPlayingRef.current = true
					fadeVolumeTo(volumeRef.current)
				})
				.catch(() => {
					setOutputVolume(volumeRef.current)
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
		ensureAudioGraph,
		onPlayingChange,
		savePlayerState,
		setOutputVolume,
		storageKey,
		track.audioSrc,
	])

	return (
		<section
			className={`music-player${pathname === '/' || pathname === '/home' ? ' music-player--home' : ''}`}
			aria-label={`${track.title} player`}
		>
			<audio ref={audioRef} src={track.audioSrc} preload="metadata" />

			<div className="music-player__controls">
				<div className="music-player__info">
					<strong>{track.title}</strong>
					<span>{track.artist}</span>
				</div>

				<div className="music-player__actions" aria-label="Playback controls">
					<button
						className="player-control"
						type="button"
						disabled={!canPlayPrevious}
						aria-label="Previous track"
						onClick={onPreviousTrack}
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
						disabled={!canPlayNext}
						aria-label="Next track"
						onClick={onNextTrack}
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
	canPlayNext: PropTypes.bool.isRequired,
	canPlayPrevious: PropTypes.bool.isRequired,
	onPlayingChange: PropTypes.func,
	onNextTrack: PropTypes.func.isRequired,
	onPreviousTrack: PropTypes.func.isRequired,
	track: PropTypes.shape({
		artist: PropTypes.string.isRequired,
		audioSrc: PropTypes.string.isRequired,
		coverSrc: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		album: PropTypes.string.isRequired,
		phrase: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		videoSrc: PropTypes.string,
	}).isRequired,
}
