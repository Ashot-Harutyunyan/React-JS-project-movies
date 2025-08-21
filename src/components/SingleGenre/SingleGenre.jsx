import './singleGenre.style.scss'
import { useEffect } from 'react'
import { useSingleGenreQuery } from "./useSingleGenreQuery.js"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useParams } from "react-router"
import ContentImg from "../ContentImg/ContentImg.jsx"

function SingleGenre() {
    const [language] = useLanguage()
    const { id } = useParams()

    const {
        data,
        isError,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSingleGenreQuery(language.url, id)

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

    if (isLoading) return <p className="scrollUp">Loading...</p>
    if (isError) return <p className="error scrollUp">{error.message}</p>

    return (
        <section className="scrollUp">
            <div className="container-search-movies">
                {data.pages.flatMap(page =>
                    page.results.map(elem => (
                        elem.backdrop_path && (
                            <div className="container-search-movies-div" key={elem.id}>
                                <ContentImg {...elem} />
                            </div>
                        )
                    ))
                )}
            </div>
            {isFetchingNextPage && <p>Loading more...</p>}
        </section>
    )
}

export default SingleGenre