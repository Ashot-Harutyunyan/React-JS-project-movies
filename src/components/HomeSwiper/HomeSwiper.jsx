import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import ComponentLoading from '../../components/ComponentLoading/ComponentLoading.jsx'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function HomeSwiper({data}) {

    return <Swiper
        className='home-swiper-container'
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        navigation
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1.2}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        breakpoints={{
            0: {
                slidesPerView: 1,
                coverflowEffect: { rotate: 20, stretch: 0, depth: 50, modifier: 1, slideShadows: false },
            },
            768: {
                slidesPerView: 1.2,
                coverflowEffect: { rotate: 40, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
            },
            1024: {
                slidesPerView: 1.5,
                coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
            },
        }}
    >
        {data.map((item, index) => (
        <SwiperSlide key={item?.id || index}>
            <div className='home-swiper-container-img'>
                {item?.urls ? (
                    <img src={item.urls.regular} alt={item.alt_description} />
                ) : (
                    <ComponentLoading width={'100%'} height={'100%'} />
                )}
            </div>
        </SwiperSlide>
        ))}
    </Swiper>
}

export default HomeSwiper