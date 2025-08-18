import './moviesByGenre.style.scss'
import { useMoviesByGenreQuery } from "./useMoviesByGenreQuery.js"
import MoviesByGenreSlider from "../MoviesByGenreSlider/MoviesByGenreSlider.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"

function MoviesByGenre({genreName, genreId}) {

    const [language] = useLanguage()
    const loadingArray = new Array(20).fill(null)
    const { data, status, isError } = useMoviesByGenreQuery({genreName, genreId}, language)

    return (<>
        {isError && <p className='error'>Error {isError}</p>}
        <MoviesByGenreSlider data={status === 'success' ? data : loadingArray}/>
    </>)
}

export default MoviesByGenre