import { useMoviesByGenreQuery } from "./useMoviesByGenreQuery.js"
import MoviesByGenreSlider from "../MoviesByGenreSlider/MoviesByGenreSlider.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useLoadingArray } from "../hooks/useLoadingArray.js"
import QueryGifError from "../QueryGifError/QueryGifError.jsx"

function MoviesByGenre({genreId}) {

    const [language] = useLanguage()
    const loadingArray = useLoadingArray(20)
    const { data, status, isError, error } = useMoviesByGenreQuery(genreId, language.url)

    if (!genreId) {
        return <MoviesByGenreSlider data={loadingArray} />
    }

    return (<>
        {isError
            ? <QueryGifError title='errorLoadingMovies' message={error.message}/>
            : <MoviesByGenreSlider data={status === 'success' ? data : loadingArray}/>
        }
    </>)
}

export default MoviesByGenre