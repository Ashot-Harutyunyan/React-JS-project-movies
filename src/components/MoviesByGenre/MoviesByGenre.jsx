import { useMoviesByGenreQuery } from "./useMoviesByGenreQuery.js"
import MoviesByGenreSlider from "../MoviesByGenreSlider/MoviesByGenreSlider.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useLoadingArray } from "../hooks/useLoadingArray.js"

function MoviesByGenre({genreId}) {

    const [language] = useLanguage()
    const loadingArray = useLoadingArray(20)
    const { data, status, isError, error } = useMoviesByGenreQuery(genreId, language.url)

    if (!genreId) {
        return <MoviesByGenreSlider data={loadingArray} />
    }

    return (<>
        {isError && <p className='error'>{error.message}</p>}
        <MoviesByGenreSlider data={status === 'success' ? data : loadingArray}/>
    </>)
}

export default MoviesByGenre