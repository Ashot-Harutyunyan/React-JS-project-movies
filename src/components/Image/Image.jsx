import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Image({url, alt, horizontally}) {
    return (!!url
        ? <LazyLoadImage src={`https://image.tmdb.org/t/p/w500${url}`} alt={alt} effect="blur"/>
        : horizontally
                ? <LazyLoadImage src='../../../public/horizontally-image-missing.png' alt={alt} effect="blur"/>
                : <LazyLoadImage src='../../../public/image-missing.png' alt={alt} effect="blur"/>
    )
}

export default Image