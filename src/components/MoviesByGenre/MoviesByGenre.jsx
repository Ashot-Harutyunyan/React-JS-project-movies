import { useMoviesByGenreQuery } from "./useMoviesByGenreQuery.js"
import MoviesByGenreSlider from "../MoviesByGenreSlider/MoviesByGenreSlider.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"

function MoviesByGenre({genreId}) {

    const [language] = useLanguage()
    const loadingArray = new Array(20).fill(null)
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