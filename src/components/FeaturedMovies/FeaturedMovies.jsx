import './featuredMovies.style.scss'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { getFavoritesArray } from "../../firebase/firebase.js"
import { useAuth } from "../../ctx/AuthContext.jsx"
import { CiBookmark } from "react-icons/ci"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Bookmark from "../Bookmark/Bookmark.jsx"

function FeaturedMovies() {

    const [ language ] = useLanguage()
    const [ user ] = useAuth()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    async function loadFavorites() {
        if (!user) return
        const data = await getFavoritesArray()
        setFavorites(data)
        setLoading(false)
    }

    useEffect(() => {
        loadFavorites()
    }, [user, refresh])

    return (<section className="container-featured-movies scrollUp">
        <h2 className="container-featured-movies-title">{language.featuredMoviesTitle}</h2>
        <h3 className="container-featured-movies-small-title">{language.featuredMoviesSubtitle}</h3>
        <section className='container-featured-movies-content'>
            {favorites.length > 0 ? favorites.map(({id, overview, poster_path, release_date, title}) => (
                <Link to={`FeaturedMovies/${id}`} key={id}>
                    <div className="modal-single-genre-content">
                        <div className='modal-single-genre-content-background'>
                            <div className="modal-single-genre-content-container-img">
                                {poster_path !== null
                                    ? <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                        alt={title}
                                        effect="blur"
                                    />
                                    : <LazyLoadImage
                                        src='../../../public/image-missing.png'
                                        alt={title}
                                        effect="blur"
                                    />
                                }
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
                                                release_date:
                                                release_date,
                                                overview: overview
                                            }}
                                            onToggle={() => {
                                                setRefresh(prev => !prev)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                ))
                : <div className='container-no-favorite-movies'>
                    <div className='no-favorite-movies-container-icon'>
                        <CiBookmark/>
                    </div>
                    <div className='container-no-favorite-movies-title-text'>
                        <h2>{language.noFavoriteMoviesTitle}</h2>
                        <p>{language.noFavoriteMoviesSubtitle}</p>
                    </div>
                    <Link to='/' className='browse-movies-link'>{language.browseMoviesLinkText}</Link>
                </div>
            }
        </section>
    </section>)
}

export default FeaturedMovies