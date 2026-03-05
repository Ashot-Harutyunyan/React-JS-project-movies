import {useLoadingArray} from "../hooks/useLoadingArray.js"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"

function SingleProductSliderLoading() {

    const loadingArray = useLoadingArray(14)

    return <>
        <div className='SingleProduct-container-loading-title'>
            <ComponentLoading width={'250px'} height={'25px'}/>
        </div>
        <div className="SingleProduct-container-loading-Swiper">
            {loadingArray.map((_, index) => (
                <ComponentLoading key={index} width={'100px'} height={'150px'}/>
            ))}
        </div>
    </>
}

export default SingleProductSliderLoading