import './singleProductMovieInfo.style.scss'
import { useEffect } from 'react'
import { useMovieInfoQuery } from "./useMovieInfoQuery.js"
import { LiaLocationArrowSolid } from "react-icons/lia"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import Bookmark from "../Bookmark/Bookmark.jsx"

function SingleProductMovieInfo({ id, handleChildData }) {

    const [language] = useLanguage()

    const { data, isError, isLoading, error } = useMovieInfoQuery(id, language.url)

    useEffect(() => {
        if (data?.backdrop_path) {
            handleChildData(`https://image.tmdb.org/t/p/w500${data.backdrop_path}`)
        }else {
            handleChildData('../../../public/horizontally-image-missing.png')
        }
    }, [data, handleChildData])

    console.log(data)

    if(isLoading) return <>
        <div className='SingleProduct-iframe-info'>
            <ComponentLoading width={'200px'} height={'25px'}/>
            <ComponentLoading width={'200px'} height={'25px'}/>
        </div>
        <div className="SingleProduct-section-two">
            <ComponentLoading width={'200px'} height={'40px'}/>
            <ComponentLoading width={'250px'} height={'25px'}/>
            <ComponentLoading width={'90%'} height={'80px'}/>
            <ComponentLoading width={'200px'} height={'40px'}/>
        </div>
    </>
    if(isError) return <p className='error'>{error.message}</p>

    return (<>
        <div className='SingleProduct-iframe-info'>
            {data.release_date !== ''
                ? <div className='SingleProduct-section-one-data'>
                        <span>{language.ReleaseDate}</span><LiaLocationArrowSolid className='SingleProduct-icon-arrow-genre'/>
                        <span>{data.release_date.split("-").join(" ")}</span>
                  </div>
                : <div className='SingleProduct-section-one-data'>
                        <span>{language.noReleaseDate}</span>
                  </div>
            }
            {data.genres.length > 0 ? <div className='SingleProduct-section-one-info'>
                <h3>{language.Genre}</h3><LiaLocationArrowSolid className='SingleProduct-icon-arrow-genre'/>
                {data.genres.map(({ id, name }) => (
                    <span key={id}>{name}</span>
                ))}
            </div>
            : <div className='SingleProduct-section-one-info'>
                <h3>{language.noGenre}</h3>
            </div>
            }
        </div>
        <div className="SingleProduct-section-two">
            <div className="SingleProduct-section-two-info">
                <h2>{data.title}</h2>
                <p>{data.tagline}</p>
                <p>{data.overview ? data.overview : language.noDescription}</p>
            </div>
            <Bookmark
                variant="button"
                movie={{
                    id: data.id,
                    poster_path: data.poster_path,
                    title: data.title,
                    release_date: data.release_date,
                    overview: data.overview
                }}
            />
        </div>
    </>)
}

export default SingleProductMovieInfo