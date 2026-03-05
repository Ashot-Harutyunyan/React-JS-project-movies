import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"

function SingleProductMovieInfoLoading() {
    return <>
        <div className='SingleProduct-iframe-info'>
            <ComponentLoading width={'200px'} height={'25px'}/>
            <ComponentLoading width={'200px'} height={'25px'}/>
        </div>
        <div className="SingleProduct-section-two">
            <ComponentLoading width={'200px'} height={'40px'}/>
            <ComponentLoading width={'250px'} height={'25px'}/>
            <ComponentLoading width={'90%'} height={'80px'}/>
            <ComponentLoading width={'200px'} height={'40px'}/>
        </div>
    </>
}

export default SingleProductMovieInfoLoading