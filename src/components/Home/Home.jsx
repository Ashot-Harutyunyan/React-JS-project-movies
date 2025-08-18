import './home.style.scss'
import HomeSlider from "../HomeSlider/HomeSlider.jsx"
import HomeContext from "../HomeContext/HomeContext.jsx"
import { useHomeContextQuery } from "./useHomeContextQuery.js"
import { useLanguage } from '../../ctx/LanguageContext.jsx'

function Home() {

    const [language] = useLanguage()

    const { data, isError, status} = useHomeContextQuery(language)
    const loadingArray = new Array(20).fill(null)

    return (<>
        {isError && <p className='error'>Error {isError}</p>}
        <HomeSlider/>
        <HomeContext data={status === 'success' ? data.genres : loadingArray}/>
    </>)
}

export default Home