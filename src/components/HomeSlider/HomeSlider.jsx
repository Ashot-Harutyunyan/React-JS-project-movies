import './homeSlider.style.scss'
import HomeSwiper from "../HomeSwiper/HomeSwiper.jsx"
import { useLoadingArray } from "../hooks/useLoadingArray.js"

function HomeSlider() {

    const loadingArray = useLoadingArray(10, 'photo')

    return (<>
        <HomeSwiper data={loadingArray} />
    </>)
}

export default HomeSlider