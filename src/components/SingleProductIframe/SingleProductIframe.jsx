import { useIframeQuery } from './useIframeQuery.js'
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import QueryTextError from "../QueryTextError/QueryTextError.jsx"

function SingleProductIframe({ id, dataImg }) {

    const [language] = useLanguage()
    const { data, isError, isLoading, error } = useIframeQuery(id, language.url, dataImg)

    if(!dataImg || isLoading) return <ComponentLoading width={'100%'} height={'100%'}/>
    if(isError) return <QueryTextError title='pageErrorTitleVideo' message={error.message}/>


    const videos = data.videos.filter(
        video => video.name.includes('Trailer') && video.site === 'YouTube'
    )

    const trailer = videos.find(({name})=> name === 'Official Trailer' || name === 'Trailer')

    if(trailer) {
        return <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allowFullScreen
            title="Movie trailer"
        ></iframe>
    } else if (videos.length) {
        return <iframe
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            frameBorder="0"
            allowFullScreen
            title="Movie trailer"
        ></iframe>
    } else if (data.videos.length) {
        return  <iframe
            src={`https://www.youtube.com/embed/${data.videos[0].key}`}
            frameBorder="0"
            allowFullScreen
            title="Movie trailer"
        ></iframe>
    } else {
        return <LazyLoadImage
            src={data.fallbackImage}
            alt="No Trailer Found"
            effect="blur"
        />
    }
}

export default SingleProductIframe