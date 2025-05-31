import './moviesByGenre.style.scss'
import { useRef } from 'react'
import { useQuery } from "@tanstack/react-query"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { RxChevronLeft } from "react-icons/rx"
import { RxChevronRight } from "react-icons/rx"

function MoviesByGenre({genreName, genreId}) {

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const { data, status, isError } = useQuery({
        queryFn: async ()=> {
            const response = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en&with_genres=${genreId}&page=1`
            )
            return response.json()
        },
        queryKey: [`Genre ${genreName}`]
    });

    return (<>
        {status === 'pending' && <h2 className='Loading'>Loading...</h2>}
        {isError && <p className='error'>Error {isError}</p>}
        {status === 'success' && <div className="movies-by-genre">

            <button className='swiper-but-prev' ref={prevRef}>
                <RxChevronLeft className='swiper-button-icon'/>
            </button>
            <button className='swiper-but-next' ref={nextRef}>
                <RxChevronRight className='swiper-button-icon'/>
            </button>

            <Swiper
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
                {data.results.map((elem) => <SwiperSlide key={elem.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
                        alt={elem.title}
                    />
                </SwiperSlide>)}
            </Swiper>
        </div>}
    </>)
}

export default MoviesByGenre