import { cloneElement, isValidElement, useState } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MusicPlayer } from '../MusicPlayer/MusicPlayer'
import ramonaFlowers from '../../assets/music/011-alvaro.mp3'
import { useLocation } from 'react-router-dom'
import './Layout.css'

export const Layout = ({ children }) => {
	const { pathname } = useLocation()
	const [isPlaying, setIsPlaying] = useState(false)

	return (
		<>
			<Header></Header>

			<main className={pathname === '/' ? 'app-main app-main--home' : 'app-main'}>
				{isValidElement(children) ? cloneElement(children, { isPlaying }) : children}

				<MusicPlayer
					artist="Álvaro Díaz"
					audioSrc={ramonaFlowers}
					title="Funeral"
					onPlayingChange={setIsPlaying}
				/>
			</main>

			<Footer></Footer>
		</>
	)
}
