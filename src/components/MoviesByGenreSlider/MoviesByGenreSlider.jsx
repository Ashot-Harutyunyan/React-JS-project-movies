import { useRef } from 'react'
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import ContentImg from "../ContentImg/ContentImg.jsx"

import 'swiper/css'
import 'swiper/css/navigation'
import {RxChevronLeft, RxChevronRight} from "react-icons/rx"

function MoviesByGenreSlider({data}) {

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    return <div className="movies-by-genre">

        <button className='swiper-but-prev' ref={prevRef}>
            <RxChevronLeft className='swiper-button-icon'/>
        </button>
        <button className='swiper-but-next' ref={nextRef}>
            <RxChevronRight className='swiper-button-icon'/>
        </button>

        <Swiper className="swiper-grab"
                       modules={[Navigation]}
                       spaceBetween={20}
                       breakpoints={{
                           50: {slidesPerView: 2.3},
                           390: {slidesPerView: 3.3},
                           700: {slidesPerView: 4.3},
                           900: {slidesPerView: 5.3},
                           1200: {slidesPerView: 6.3},
                           1600: {slidesPerView: 7.3},
                       }}
                       onInit={(swiper) => {
                           swiper.params.navigation.prevEl = prevRef.current;
                           swiper.params.navigation.nextEl = nextRef.current;
                           swiper.navigation.init();
                           swiper.navigation.update();
                       }}
        >
            {data.results ? data.results.map((elem, i) => {
                return <SwiperSlide key={elem.id} className='movies-by-genre-swiper-slide'>
                    <ContentImg {...elem} />
                </SwiperSlide>})
                : data.map((_, index) => {
                 return <SwiperSlide key={index} className='movies-by-genre-swiper-slide'>
                     <div className='SwiperSlide-container'>
                        <ComponentLoading width={'100%'} height={'100%'} />
                     </div>
                </SwiperSlide>
                })}
        </Swiper>
    </div>
}

export default MoviesByGenreSlider