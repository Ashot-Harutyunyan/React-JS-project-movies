import './singleProductSlider.style.scss'
import { useRef, useState } from 'react'
import { useSingleProductSliderQuery } from './useSingleProductSliderQuery.js'
import SingleProductModal from "../Modals/SingleProductModal/SingleProductModal.jsx"
import {useModals} from "../../ctx/ModalsContext.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { RxChevronLeft } from "react-icons/rx"
import { RxChevronRight } from "react-icons/rx"

function SingleProductSlider({ id }) {

    const [language] = useLanguage()
    const { data, isError, isLoading, error } = useSingleProductSliderQuery(id, language.url)

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const dialogRef = useRef(null)
    const [actor, setActor] = useState(null)
    const { handleOpenModal } = useModals()

    function openModal() {
        dialogRef.current?.showModal()
        handleOpenModal()
    }

    if(isLoading) return <>
        <div className='SingleProduct-container-loading-title'>
            <ComponentLoading width={'250px'} height={'25px'}/>
        </div>
        <div className="SingleProduct-container-loading-Swiper">
            {new Array(14).fill(null).map((_, index) => (
                <ComponentLoading key={index} width={'100px'} height={'150px'}/>
            ))}
        </div>
    </>
    if(isError) return <p className='error'>{error.message}</p>

    return (<>
        <h2 className="SingleProduct-Actors-and-creators">
            {data.length ? language.ActorsAndCreators : language.NoActorsAndCreators}
        </h2>
        <div className="SingleProduct-container-Swiper">
            <button className="SingleProduct-Swiper-button-Left" ref={prevRef}><RxChevronLeft/></button>
            <button className="SingleProduct-Swiper-button-Right" ref={nextRef}><RxChevronRight/></button>
            <Swiper modules={[Navigation]}
                    spaceBetween={20}
                    breakpoints={{
                        265: { slidesPerView: 2 },
                        310: { slidesPerView: 2.5 },
                        345: { slidesPerView: 3 },
                        425: { slidesPerView: 3.5 },
                        480: { slidesPerView: 4 },
                        550: { slidesPerView: 4.5 },
                        615: { slidesPerView: 5 },
                        730: { slidesPerView: 5.5 },
                        840: { slidesPerView: 6.5 },
                        940: { slidesPerView: 7.5 },
                        1070: { slidesPerView: 8.5 },
                        1190: { slidesPerView: 9.5 },
                        1300: { slidesPerView: 10.5 },
                        1400: { slidesPerView: 11.5 },
                        1500: { slidesPerView: 12.5 },
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
            >
                {data.map((actor) => (
                    <SwiperSlide key={actor.id} onClick={()=> {
                        setActor(actor)
                        openModal()
                    }}>
                        <div className="slider-item">
                            <div className="image-container">
                                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name}/>
                            </div>
                            <p>{actor.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <SingleProductModal actor={actor} dialogRef={dialogRef}/>
    </>)
}

export default SingleProductSlider