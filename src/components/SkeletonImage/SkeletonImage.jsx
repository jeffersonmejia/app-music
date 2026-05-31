import PropTypes from 'prop-types'
import { useState } from 'react'
import './SkeletonImage.css'

export const SkeletonImage = ({
	alt,
	className = '',
	src,
	videoSrc,
	isPlaying = false,
}) => {
	const shouldShowVideo = isPlaying && videoSrc
	const mediaKey = shouldShowVideo ? videoSrc : src
	const [loadedMediaKey, setLoadedMediaKey] = useState(null)
	const isLoaded = loadedMediaKey === mediaKey

	return (
		<span className={`skeleton-image ${className} ${isLoaded ? 'is-loaded' : ''}`}>
			{shouldShowVideo ? (
				<video
					className={className}
					src={videoSrc}
					onLoadedData={() => setLoadedMediaKey(mediaKey)}
					autoPlay
					muted
					loop
					playsInline
				/>
			) : (
				<img className={className} src={src} alt={alt} onLoad={() => setLoadedMediaKey(mediaKey)} />
			)}
		</span>
	)
}

SkeletonImage.propTypes = {
	alt: PropTypes.string.isRequired,
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	videoSrc: PropTypes.string,
	isPlaying: PropTypes.bool,
}
