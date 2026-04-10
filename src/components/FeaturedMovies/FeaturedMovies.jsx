import './featuredMovies.style.scss'
import { useState, useEffect } from 'react'
import { Link } from "react-router"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { getFavoritesArray } from "../../firebase/firebase.js"
import { useAuth } from "../../ctx/AuthContext.jsx"
import { CiBookmark } from "react-icons/ci"
import Bookmark from "../Bookmark/Bookmark.jsx"
import Image from "../Image/Image.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import FeaturedMoviesLoading from './FeaturedMoviesLoading.jsx'
import { useLoadingArray } from '../hooks/useLoadingArray.js'
import QueryGifError from '../QueryGifError/QueryGifError.jsx'

function FeaturedMovies() {

    const [ language ] = useLanguage()
    const [ user ] = useAuth()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const loadingArray = useLoadingArray(4)

    useEffect(() => {
        async function loadFavorites() {
            if (!user) {
                setLoading(false)
                return
            }
            setLoading(true)
            setError(null)
            try {
                const data = await getFavoritesArray(language.url, user.uid)
                setFavorites(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadFavorites()
    }, [user, refresh, language.url])

    return (
        <section className="container-featured-movies scrollUp">
            <h2 className="container-featured-movies-title">
                {loading ? <ComponentLoading width={'300px'} height={'35px'} /> : language.featuredMoviesTitle}
            </h2>
            <h3 className="container-featured-movies-small-title">
                {loading ? <ComponentLoading width={'200px'} height={'25px'} /> : language.featuredMoviesSubtitle}
            </h3>
            <section className='container-featured-movies-content'>
                {error
                    ? <QueryGifError title='errorLoadingFeaturedMovies' message={error?.message}/>
                    : loading ? (
                        loadingArray.map((_, index) => (
                            <FeaturedMoviesLoading key={index} />
                        ))
                    ) : favorites.length > 0 ? (
                        favorites.map(({id, overview, poster_path, release_date, title}) => (
                            <Link to={`featuredMovies/${id}`} key={id}>
                                <div className="modal-single-genre-content">
                                    <div className='modal-single-genre-content-background'>
                                        <div className="modal-single-genre-content-container-img">
                                            <Image url={poster_path} alt={title} horizontally={false} />
                                        </div>
                                        <div className='modal-single-genre-content-info'>
                                            <h3>{title}</h3>
                                            <div>
                                                <p>{release_date ? release_date.split('-').join(' ') : language.noReleaseDate}</p>
                                                <p>{overview ? overview : language.noDescription}</p>
                                                <div className='featured-movies-container-bookmark'>
                                                    <Bookmark
                                                        variant="on"
                                                        movie={{
                                                            id: id,
                                                            poster_path: poster_path,
                                                            title: title,
                                                            release_date: release_date,
                                                            overview: overview
                                                        }}
                                                        onToggle={() => setRefresh(prev => !prev)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className='container-no-favorite-movies'>
                            <div className='no-favorite-movies-container-icon'>
                                <CiBookmark/>
                            </div>
                            <div className='container-no-favorite-movies-title-text'>
                                <h2>{language.noFavoriteMoviesTitle}</h2>
                                <p>{language.noFavoriteMoviesSubtitle}</p>
                            </div>
                            <Link to='/' className='browse-movies-link'>{language.browseMoviesLinkText}</Link>
                        </div>
                    )
                }
            </section>
        </section>
    )
}

export default FeaturedMovies