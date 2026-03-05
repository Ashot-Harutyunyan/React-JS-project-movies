import './singleProductMovieInfo.style.scss'
import { useMovieInfoQuery } from "./useMovieInfoQuery.js"
import { LiaLocationArrowSolid } from "react-icons/lia"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import Bookmark from "../Bookmark/Bookmark.jsx"
import SingleProductMovieInfoLoading from "./SingleProductMovieInfoLoading.jsx"
import QueryGifError from "../QueryGifError/QueryGifError.jsx"

function SingleProductMovieInfo({ id, setDataImg }) {

    const [language] = useLanguage()

    const { data, isError, isLoading, error } = useMovieInfoQuery(id, language.url, handleChangeStateImg)

    function  handleChangeStateImg(stateImg) {
        console.log(stateImg, 'handleChangeStateImg')
        if(!stateImg) setDataImg('../../../public/horizontally-image-missing.png')
        else setDataImg('https://image.tmdb.org/t/p/w500' + stateImg)
    }

    if(isLoading) return <SingleProductMovieInfoLoading/>
    if(isError) return <QueryGifError title='pageErrorTitleMovieInfo' message={error.message}/>

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