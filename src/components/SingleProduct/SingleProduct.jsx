import './singleProduct.style.scss'
import { useState } from "react"
import { useParams } from "react-router"
import SingleProductIframe from "../SingleProductIframe/SingleProductIframe.jsx"
import SingleProductMovieInfo from '../SingleProductMovieInfo/SingleProductMovieInfo.jsx'
import SingleProductSlider from "../SingleProductSlider/SingleProductSlider.jsx"

function SingleProduct() {

    const { id, movieId } = useParams()
    const [dataImg, setDataImg] = useState(null)
    let productId = id

    const handleChildData = (childData) => {
        setDataImg(childData)
    }

    if(movieId){
        productId = movieId
    }

    return(<>
        <section className='SingleProduct-container'>
                <div className="SingleProduct-section-one">
                    <div className='SingleProduct-container-iframe'>
                        <SingleProductIframe id={productId} dataImg={dataImg} />
                    </div>
                </div>
                <SingleProductMovieInfo id={productId} handleChildData={handleChildData}/>
        </section>
        <SingleProductSlider id={productId}/>
    </>)
}

export default SingleProduct