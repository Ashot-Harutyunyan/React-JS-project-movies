import './singleProduct.style.scss'
import { useParams } from "react-router"
import SingleProductIframe from "../SingleProductIframe/SingleProductIframe.jsx"
import SingleProductMovieInfo from '../SingleProductMovieInfo/SingleProductMovieInfo.jsx'
import SingleProductSlider from "../SingleProductSwiper/SingleProductSlider.jsx"

function SingleProduct() {

    const { id } = useParams()

    return(<>
        <section className='SingleProduct-container'>
                <div className="SingleProduct-section-one">
                    <div className='SingleProduct-container-iframe'>
                        <SingleProductIframe id={id}/>
                    </div>
                </div>
                <SingleProductMovieInfo id={id}/>
        </section>
        <SingleProductSlider id={id}/>
    </>)
}

export default SingleProduct