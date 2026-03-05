import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import ComponentLoading from '../../components/ComponentLoading/ComponentLoading.jsx'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function HomeSwiper({data}) {

    const [loadedStates, setLoadedStates] = useState(
        new Array(data.length).fill(false)
    )

    const handleImageLoad = (index) => {
        setLoadedStates((prev) => {
            const updated = [...prev]
            updated[index] = true
            return updated
        })
    }

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
        <SwiperSlide key={index}>
            <div className='home-swiper-container-img'>
                {!loadedStates[index] && <ComponentLoading width={'100%'} height={'100%'} />}
                <LazyLoadImage
                    src={`/${item}-${index + 1}.jpg`}
                    alt={item}
                    effect="blur"
                    threshold={100}
                    visibleByDefault={true}
                    afterLoad={() => handleImageLoad(index)}
                    style={{display: !loadedStates[index] ? 'none' : 'block' }}
                />
            </div>
        </SwiperSlide>
        ))}
    </Swiper>
}

export default HomeSwiper