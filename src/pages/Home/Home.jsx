import './Home.css'
import alvaro from '../../assets/cover/010-alvaro.png'
import { SkeletonImage } from '../../components/SkeletonImage/SkeletonImage'

export const HomePage = () => {
	return (
		<figure className="home-cover">
			<SkeletonImage src={alvaro} alt="Ramona Flowers cover" />
			<figcaption className="home-cover__caption">
				<h1>Finales alternos</h1>
				<p>Lo de nosotros tienes que superar.</p>
			</figcaption>
		</figure>
	)
}
