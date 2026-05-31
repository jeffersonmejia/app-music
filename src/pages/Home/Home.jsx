import './Home.css'
import { SkeletonImage } from '../../components/SkeletonImage/SkeletonImage'
import { usePlayer } from '../../context/PlayerContext'

export const HomePage = () => {
	const { isPlaying, track } = usePlayer()

	if (!track) return null

	return (
		<figure className="home-cover">
			<SkeletonImage
				src={track.coverSrc}
				videoSrc={track.videoSrc}
				alt={track.album}
				isPlaying={isPlaying}
			/>

			<figcaption className="home-cover__caption">
				<h1>{track.album}</h1>
				<p>{track.phrase}</p>
			</figcaption>
		</figure>
	)
}
