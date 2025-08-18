import { useIframeQuery } from './useIframeQuery.js'
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"

function SingleProductIframe({ id, dataImg }) {

    const { data, isError, isLoading } = useIframeQuery(id)

    if(isLoading) return <ComponentLoading width={'100%'} height={'100%'}/>
    if(isError) return <p className='error'>Error {isError}</p>

    const videos = data.filter(
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
    }else if (videos.length) {
        return <iframe
             src={`https://www.youtube.com/embed/${videos[0].key }`}
             frameBorder="0"
             allowFullScreen
             title="Movie trailer"
        ></iframe>
    } else if (data.length) {
        return  <iframe
             src={`https://www.youtube.com/embed/${data[0].key }`}
             frameBorder="0"
             allowFullScreen
             title="Movie trailer"
        ></iframe>
    }else {
        return <img
                src={`https://image.tmdb.org/t/p/w500${dataImg}`}
                alt="No Trailer Found"
            />
    }
}

export default SingleProductIframe