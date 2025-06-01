import './homeSlider.style.scss'
import { useQuery } from "@tanstack/react-query"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function HomeSlider() {

    const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
    const UNSPLASH_BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL

    const { data, isError, status} = useQuery({
        queryFn: async () => {
            const response = await fetch(
                `${UNSPLASH_BASE_URL}/search/photos?query=movie&client_id=${UNSPLASH_API_KEY}`
            )
            return response.json()
        },
        queryKey: ['Movies Slider']
    })

    return (<>
            {status === 'pending' && <h2 className='Loading'>Loading...</h2>}
            {isError && <p className='error'>Error {isError}</p>}
            {status === 'success' && <Swiper
                className='home-swiper-container'
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                navigation
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={1.2}
                autoplay={{ delay: 10000, disableOnInteraction: false }}
            >
                {data.results.map(({urls, alt_description, id}) => <SwiperSlide key={id}>
                    <div className='home-swiper-container-img'>
                        <img src={urls.regular} alt={alt_description}
                             style={{width: '100%', height: '400px', objectFit: 'cover',}}
                        />
                    </div>
                </SwiperSlide> )}
            </Swiper>}
    </>)
}

export default HomeSlider