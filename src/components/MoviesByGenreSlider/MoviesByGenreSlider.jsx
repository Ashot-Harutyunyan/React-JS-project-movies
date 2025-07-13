import {useRef, useState} from 'react'
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"

import 'swiper/css'
import 'swiper/css/navigation'
import {RxChevronLeft, RxChevronRight} from "react-icons/rx"

function MoviesByGenreSlider({data}) {

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const [featuredMovies, setFeaturedMovies] = useState(new Array(20).fill(false))

    const arrayConicGradient = [
        {colorOne: '#db2360', colorTwo: '#571435'},
        {colorOne: '#d2d531', colorTwo: '#423d0f'},
        {colorOne: '#21d07a', colorTwo: '#204529'},
        {colorOne: '#00e5ff', colorTwo: '#003c5f'}
    ]

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
                const percentNumber = (elem.popularity.toString()[0]) + (elem.popularity.toString().split('.')[1]?.[0] || 0)
                let index
                switch (true) {
                    case +percentNumber <= 25:
                        index = 0;
                        break;
                    case +percentNumber <= 50:
                        index = 1;
                        break;
                    case +percentNumber <= 75:
                        index = 2;
                        break;
                    case +percentNumber <= 100:
                        index = 3;
                        break;
                    default:
                        index = 0;
                }
                return <SwiperSlide key={elem.id} className='movies-by-genre-swiper-slide'>
                    <div className='SwiperSlide-container'>
                        <Link to={`/product/${elem.id}`}>
                            <div className='SwiperSlide-container-div-hover'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={featuredMovies[i] ? 'crimson' : 'transparent'} width="50px" height="50px" viewBox="-5.5 0 24 24"
                                     onClick={(e) => {
                                         e.preventDefault()
                                         setFeaturedMovies(featuredMovies.map((e, ind) => ind === i ? !e : e))
                                     }}>
                                    <path d="m0 2.089v21.911l6.545-6.26 6.544 6.26v-21.911c-.012-1.156-.951-2.089-2.109-2.089-.026 0-.051 0-.077.001h.004-8.724c-.022-.001-.047-.001-.073-.001-1.158 0-2.098.933-2.109 2.088v.001z"/>
                                </svg>
                                <p>{elem.release_date.slice(0, 4)}</p>
                            </div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
                                alt={elem.title}
                            />
                        </Link>
                    </div>
                    <div className='container-popularity-movie'>
                        <div className='container-popularity-movie-percent-color'
                             style={{background: `conic-gradient(
                            ${arrayConicGradient[index].colorOne} 0% ${percentNumber}%, 
                            ${arrayConicGradient[index].colorTwo} ${percentNumber}% 100% )`
                             }}
                        ></div>
                        <div className='container-popularity-movie-percent-text'>
                            <span>{percentNumber}</span>
                            <span>%</span>
                        </div>
                    </div>
                    <div className='movies-by-genre-title'>
                        <p>{elem.title}</p>
                    </div>
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