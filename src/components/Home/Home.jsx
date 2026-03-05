import './home.style.scss'
import HomeSlider from "../HomeSlider/HomeSlider.jsx"
import HomeContext from "../HomeContext/HomeContext.jsx"
import { useHomeContextQuery } from "./useHomeContextQuery.js"
import { useLanguage } from '../../ctx/LanguageContext.jsx'
import { useLoadingArray } from "../hooks/useLoadingArray.js"
import QueryGifError from "../QueryGifError/QueryGifError.jsx"

function Home() {

    const [language] = useLanguage()
    const { data, isError, status, error} = useHomeContextQuery(language.url)
    const loadingArray = useLoadingArray(20)

    return (<>
        <HomeSlider/>
        {isError
            ? <QueryGifError title='errorLoadingGenresAndMovies' message={error.message}/>
            : <HomeContext data={status === 'success' ? data.genres : loadingArray}/>
        }
    </>)
}

export default Home