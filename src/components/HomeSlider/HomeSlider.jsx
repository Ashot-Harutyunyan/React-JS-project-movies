import './homeSlider.style.scss'
import HomeSwiper from "../HomeSwiper/HomeSwiper.jsx"

function HomeSlider() {

    const loadingArray = new Array(10).fill('photo')

    return (<>
        <HomeSwiper data={loadingArray} />
    </>)
}

export default HomeSlider