import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"

function FeaturedMoviesLoading() {
    return <div className="modal-single-genre-content">
                <div className='modal-single-genre-content-background'>
                    <div className="modal-single-genre-content-container-img">
                        <ComponentLoading width={'100%'} height={'300px'} />
                    </div>
                    <div className='modal-single-genre-content-info'>
                        <ComponentLoading width={'80%'} height={'25px'} />
                        <ComponentLoading width={'60%'} height={'20px'} />
                        <ComponentLoading width={'100%'} height={'80px'} />
                    </div>
                </div>
            </div>
}

export default FeaturedMoviesLoading