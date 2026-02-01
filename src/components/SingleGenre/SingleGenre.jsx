import './singleGenre.style.scss'
import { useEffect, useState, useRef } from 'react'
import { useSingleGenreQuery } from "./useSingleGenreQuery.js"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useParams } from "react-router"
import {useModals} from "../../ctx/ModalsContext.jsx"
import SingleGenreModal from "../Modals/SingleGenreModal/SingleGenreModal.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import Bookmark from "../Bookmark/Bookmark.jsx"
import { useLoadingArray } from "../hooks/useLoadingArray.js"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function SingleGenre() {

    const [language] = useLanguage()
    const { genre, id } = useParams()
    const { handleOpenModal, openModal } = useModals()
    const dialogRef = useRef(null)
    const [movie, setMovie] = useState(null)

    function openSingleGenreModal() {
        dialogRef.current?.showModal()
        handleOpenModal()
    }

    const { data, isError, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useSingleGenreQuery(language.url, id)

    const loadingArray = useLoadingArray(20)

        useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage()
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)

    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    if (isLoading) return <div className='scrollUp loading'>
        <ComponentLoading width={'300px'} height={'35px'} />
        <div className="single-genre loading">
            {loadingArray.map((_, index) => (
                <div className="single-genre-container-movie" key={index}>
                    <ComponentLoading width={'clamp(160px, 20vw, 260px)'} height={'clamp(80px, 10vw, 160px)'} />
                    <ComponentLoading width={'clamp(160px, 20vw, 260px)'} height={'clamp(60px, 8vw, 100px)'} />
                </div>
            ))}
        </div>
    </div>
    if (isError) return <p className="error scrollUp">{error.message}</p>

    return (<>
        <h2 className='scrollUp single-genre-title'>{language.allMovies} {genre.toLowerCase()}</h2>
        <section className="single-genre">
            {data.pages.map(page =>
                page.results.map((elem) => (
                    elem.backdrop_path && (
                        <div className="single-genre-container-movie" key={elem.id}
                            onClick={(e) => {
                                e.stopPropagation()
                                setMovie(null)
                                openSingleGenreModal()
                                setMovie(elem)
                            }}
                        >
                            <LazyLoadImage
                                src={`https://image.tmdb.org/t/p/w500${elem.backdrop_path}`}
                                alt={elem.title}
                                effect="blur"
                            />
                            <div>
                                <h3>{elem.title}</h3>
                                <p>{elem.release_date.split('-').reverse().join(' ')}</p>
                                <Bookmark
                                    variant="button"
                                    movie={{
                                        id: elem.id,
                                        poster_path: elem.poster_path,
                                        title: elem.title,
                                        release_date: elem.release_date,
                                        overview: elem.overview
                                    }}
                                />
                            </div>
                        </div>
                    )
                ))
            )}
            {isFetchingNextPage && loadingArray.map((_, index) => (
                <div className="single-genre-container-movie" key={index}>
                    <ComponentLoading width={'clamp(160px, 20vw, 260px)'} height={'clamp(80px, 10vw, 160px)'} />
                    <ComponentLoading width={'clamp(160px, 20vw, 260px)'} height={'clamp(60px, 8vw, 100px)'} />
                </div>
            ))}
        </section>
        <SingleGenreModal movie={movie} dialogRef={dialogRef} linkText={language.watchTrailer} />
    </>)
}

export default SingleGenre