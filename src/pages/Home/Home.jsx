import PropTypes from 'prop-types'
import './Home.css'
import alvaro from '../../assets/cover/010-alvaro.png'
import alvaroVideo from '../../assets/video/011-alvaro.mp4'
import { SkeletonImage } from '../../components/SkeletonImage/SkeletonImage'

export const HomePage = ({ isPlaying = false }) => {
	return (
		<figure className="home-cover">
			<SkeletonImage
				src={alvaro}
				videoSrc={alvaroVideo}
				alt="Álbum"
				isPlaying={isPlaying}
			/>

			<figcaption className="home-cover__caption">
				<h1>Sayonara</h1>
				<p>Lo de nosotros tienes que superar.</p>
			</figcaption>
		</figure>
	)
}

HomePage.propTypes = {
	isPlaying: PropTypes.bool,
}
