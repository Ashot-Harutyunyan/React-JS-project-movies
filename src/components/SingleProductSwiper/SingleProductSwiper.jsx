import './singleProductSwiper.style.scss'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { RxChevronLeft } from "react-icons/rx"
import { RxChevronRight } from "react-icons/rx"

function SingleProductSwiper({actors}) {

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    return (<>
        <h2 className="SingleProduct-Actors-and-creators">Actors and creators</h2>
        <div className="SingleProduct-container-Swiper">
            <button className="SingleProduct-Swiper-button-Left" ref={prevRef}><RxChevronLeft/></button>
            <button className="SingleProduct-Swiper-button-Right" ref={nextRef}><RxChevronRight/></button>
            <Swiper modules={[Navigation]}
                    spaceBetween={20}
                    breakpoints={{
                        150: { slidesPerView: 1.5 },
                        200: { slidesPerView: 2 },
                        265: { slidesPerView: 2.5 },
                        330: { slidesPerView: 3 },
                        380: { slidesPerView: 3.5 },
                        440: { slidesPerView: 4 },
                        490: { slidesPerView: 4.5 },
                        615: { slidesPerView: 5.5 },
                        730: { slidesPerView: 6.5 },
                        840: { slidesPerView: 7.5 },
                        940: { slidesPerView: 8.5 },
                        1070: { slidesPerView: 9.5 },
                        1190: { slidesPerView: 10.5 },
                        1300: { slidesPerView: 11.5 },
                        1400: { slidesPerView: 12.5 },
                        1500: { slidesPerView: 13.5 },
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
            >
                {actors.map((actor) => (
                    <SwiperSlide key={actor.id}>
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


    </>)
}

export default SingleProductSwiper