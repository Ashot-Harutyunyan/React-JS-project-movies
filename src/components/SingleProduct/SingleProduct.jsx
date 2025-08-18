import './singleProduct.style.scss'
import { useState } from "react"
import { useParams } from "react-router"
import SingleProductIframe from "../SingleProductIframe/SingleProductIframe.jsx"
import SingleProductMovieInfo from '../SingleProductMovieInfo/SingleProductMovieInfo.jsx'
import SingleProductSlider from "../SingleProductSwiper/SingleProductSlider.jsx"

function SingleProduct() {

    const { id } = useParams()
    const [dataImg, setDataImg] = useState(null)

    const handleChildData = (childData) => {
        setDataImg(childData)
    }

    return(<>
        <section className='SingleProduct-container'>
                <div className="SingleProduct-section-one">
                    <div className='SingleProduct-container-iframe'>
                        <SingleProductIframe id={id} dataImg={dataImg} />
                    </div>
                </div>
                <SingleProductMovieInfo id={id} handleChildData={handleChildData}/>
        </section>
        <SingleProductSlider id={id}/>
    </>)
}

export default SingleProduct