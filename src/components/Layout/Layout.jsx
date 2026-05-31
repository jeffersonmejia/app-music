import { useState } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MusicPlayer } from '../MusicPlayer/MusicPlayer'
import { useLocation } from 'react-router-dom'
import { PlayerContext } from '../../context/PlayerContext'
import tracks from '../../data/tracks.json'
import './Layout.css'

const audioAssets = import.meta.glob('../../assets/music/*', {
	eager: true,
	query: '?url',
	import: 'default',
})

const coverAssets = import.meta.glob('../../assets/cover/*', {
	eager: true,
	query: '?url',
	import: 'default',
})

const videoAssets = import.meta.glob('../../assets/video/*', {
	eager: true,
	query: '?url',
	import: 'default',
})

const resolvedTracks = tracks.map((track) => ({
	...track,
	audioSrc: audioAssets[`../../assets/music/${track.audioPath}`],
	coverSrc: coverAssets[`../../assets/cover/${track.coverPath}`],
	videoSrc: videoAssets[`../../assets/video/${track.videoPath}`],
}))

export const Layout = ({ children }) => {
	const { pathname } = useLocation()
	const [isPlaying, setIsPlaying] = useState(false)
	const [trackIndex, setTrackIndex] = useState(0)
	const isHome = pathname === '/' || pathname === '/home'
	const track = resolvedTracks[trackIndex]
	const canPlayPrevious = trackIndex > 0
	const canPlayNext = trackIndex < resolvedTracks.length - 1

	const handlePreviousTrack = () => {
		setTrackIndex((currentIndex) => Math.max(0, currentIndex - 1))
	}

	const handleNextTrack = () => {
		setTrackIndex((currentIndex) =>
			Math.min(resolvedTracks.length - 1, currentIndex + 1),
		)
	}

	return (
		<>
			<Header></Header>

			<main
				className={
					isHome
						? `app-main app-main--home${isPlaying ? ' app-main--cinema' : ''}`
						: 'app-main'
				}
			>
				<PlayerContext.Provider value={{ isPlaying, track }}>
					{children}
				</PlayerContext.Provider>

				<MusicPlayer
					canPlayNext={canPlayNext}
					canPlayPrevious={canPlayPrevious}
					onPlayingChange={setIsPlaying}
					onNextTrack={handleNextTrack}
					onPreviousTrack={handlePreviousTrack}
					track={track}
				/>
			</main>

			<Footer></Footer>
		</>
	)
}
