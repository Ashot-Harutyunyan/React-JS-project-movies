import './singleGenre.style.scss'
import { useEffect, useState, useRef } from 'react'
import { useSingleGenreQuery } from "./useSingleGenreQuery.js"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useParams } from "react-router"
import {useModals} from "../../ctx/ModalsContext.jsx"
import SingleGenreModal from "../Modals/SingleGenreModal/SingleGenreModal.jsx"
import Bookmark from "../Bookmark/Bookmark.jsx"
import Image from "../Image/Image.jsx"
import SingleGenreLoading from "./SingleGenreLoading.jsx"
import QueryGifError from "../QueryGifError/QueryGifError.jsx";

function SingleGenre() {

    const [language] = useLanguage()
    const { id } = useParams()
    const { handleOpenModal, openModal } = useModals()
    const dialogRef = useRef(null)
    const [movie, setMovie] = useState(null)

    function openSingleGenreModal() {
        dialogRef.current?.showModal()
        handleOpenModal()
    }

    const { data, isError, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useSingleGenreQuery(language.url, id)

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

    if (isLoading) return <SingleGenreLoading loadingNextPage={false}/>
    if (isError) return <div className="scrollUp">
        <QueryGifError title='errorLoadingFeaturedMovies' message={error.message}/>
    </div>

    return (<>
        <h2 className='scrollUp single-genre-title'>{language.allMovies} {data.pages[0].genreName.toLowerCase()}</h2>
        <section className="single-genre">
            {data.pages.map(page =>
                page.results.map((elem) => (
                        <div className="single-genre-container-movie" key={elem.id}
                            onClick={(e) => {
                                e.stopPropagation()
                                setMovie(null)
                                openSingleGenreModal()
                                setMovie(elem)
                            }}
                        >
                            <Image url={elem.backdrop_path} alt={elem.title} horizontally={true} />
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
                ))
            )}
            {isFetchingNextPage && <SingleGenreLoading loadingNextPage={true}/>}
        </section>
        <SingleGenreModal movie={movie} dialogRef={dialogRef} linkText={language.watchTrailer} />
    </>)
}

export default SingleGenre