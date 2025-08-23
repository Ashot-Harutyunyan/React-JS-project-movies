import './singleGenre.style.scss'
import { useEffect, useState, useRef } from 'react'
import { useSingleGenreQuery } from "./useSingleGenreQuery.js"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useParams } from "react-router"
import {useAuth} from "../../ctx/AuthContext.jsx"
import {useModals} from "../../ctx/ModalsContext.jsx"
import SingleGenreModal from "../Modals/SingleGenreModal/SingleGenreModal.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"

function SingleGenre() {

    const [language] = useLanguage()
    const { genre, id } = useParams()
    const [ user ] = useAuth()
    const { handleOpenModal } = useModals()
    const dialogRef = useRef(null)
    const [movie, setMovie] = useState(null)

    function openModal() {
        dialogRef.current?.showModal()
        handleOpenModal()
    }

    const {
        data,
        isError,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSingleGenreQuery(language.url, id)

    const [selected, setSelected] = useState(false)
    const loadingArray = new Array(20).fill(null)

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
                            onClick={() => {
                                setMovie(elem)
                                openModal()
                            }}
                        >
                            <img src={`https://image.tmdb.org/t/p/w500${elem.backdrop_path}`} alt={elem.title} />
                            <div>
                                <h3>{elem.title}</h3>
                                <p>{elem.release_date.split('-').reverse().join(' ')}</p>
                                <button onClick={()=> {
                                    if(!user) openModal('authRequiredModal')
                                    else setSelected(!selected)
                                }}>
                                    {selected ? language.selected : language.choose}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={selected ? 'crimson' : 'transparent'} viewBox="-5.5 0 24 24">
                                        <path d="m0 2.089v21.911l6.545-6.26 6.544 6.26v-21.911c-.012-1.156-.951-2.089-2.109-2.089-.026 0-.051 0-.077.001h.004-8.724c-.022-.001-.047-.001-.073-.001-1.158 0-2.098.933-2.109 2.088v.001z"/>
                                    </svg>
                                </button>
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