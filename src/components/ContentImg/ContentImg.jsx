import './contentImg.style.scss'
import { useState } from 'react'
import {useAuth} from "../../ctx/AuthContext.jsx"
import {useModals} from "../../ctx/ModalsContext.jsx"
import { Link } from 'react-router'

function ContentImg(elem) {

    const [ user ] = useAuth()
    const { openModal } = useModals()
    const [featuredMovie, setFeaturedMovie] = useState(false)

    const arrayConicGradient = [
        {colorOne: '#db2360', colorTwo: '#571435'},
        {colorOne: '#d2d531', colorTwo: '#423d0f'},
        {colorOne: '#21d07a', colorTwo: '#204529'},
        {colorOne: '#00e5ff', colorTwo: '#003c5f'}
    ]

    function calculatingPercentages(popularity){
        let percent
        if(popularity.toString().split('.')[0].length > 3){
            percent = 100
        }else if(popularity.toString().split('.')[0].length >= 3) {
            percent = Math.floor((popularity.toString().split('.')[0] / 1000) * 100)
        }else {
            percent = popularity.toString().split('.')[0]
        }
        return percent
    }

    const percentNumber = calculatingPercentages(elem.popularity)
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

    return (<>
        <div className='SwiperSlide-container'>
            <Link to={`/product/${elem.id}`}>
                <div className='SwiperSlide-container-div-hover'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={featuredMovie ? 'crimson' : 'transparent'} width="50px" height="50px" viewBox="-5.5 0 24 24"
                         onClick={(e) => {
                             e.preventDefault()
                             if(!user) {
                                 openModal('authRequiredModal')
                                 return
                             }
                             setFeaturedMovie(!featuredMovie)
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
    </>)
}

export default ContentImg