import PropTypes from "prop-types";
import { useState } from "react";
import "./SkeletonImage.css";

export const SkeletonImage = ({ alt, className = "", src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span className={`skeleton-image ${className} ${isLoaded ? "is-loaded" : ""}`}>
      <img className={className} src={src} alt={alt} onLoad={() => setIsLoaded(true)} />
    </span>
  );
};

SkeletonImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};
