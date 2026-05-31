import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MusicPlayer } from '../MusicPlayer/MusicPlayer'
import ramonaFlowers from '../../assets/music/010-alvaro.mp3'
import { useLocation } from 'react-router-dom'
import './Layout.css'

export const Layout = ({ children }) => {
	const { pathname } = useLocation()

	return (
		<>
			<Header></Header>
			<main className={pathname === "/" ? "app-main app-main--home" : "app-main"}>
				{children}
				<MusicPlayer
					artist="Álvaro Díaz"
					audioSrc={ramonaFlowers}
					title="Ramona Flowers"
				/>
			</main>
			<Footer></Footer>
		</>
	)
}
