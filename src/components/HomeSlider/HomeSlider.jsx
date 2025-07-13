import './homeSlider.style.scss'
import {useHomeSliderQuery} from "./useHomeSliderQuery.js"
import HomeSwiper from "../HomeSwiper/HomeSwiper.jsx"

function HomeSlider() {

    const { data, isError, status} = useHomeSliderQuery()
    const loadingArray = new Array(10).fill(null)

    return (<>
        {isError && <p className='error'>Error {isError}</p>}
        <HomeSwiper data={status === 'success' ? data.results : loadingArray} />
    </>)
}

export default HomeSlider