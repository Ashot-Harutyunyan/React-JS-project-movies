import './contentImg.style.scss'
import React from 'react'
import { Link } from 'react-router'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Bookmark from "../Bookmark/Bookmark.jsx"

function ContentImg({ id, poster_path, title, release_date, popularity, overview }) {

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

    const percentNumber = calculatingPercentages(popularity)
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
            <Link to={`/product/${id}`}>
                <div className='SwiperSlide-container-div-hover'>
                    <Bookmark
                        bookmark="on"
                        movie={{id, poster_path, title, release_date, overview}}
                    />
                    <p>{release_date.slice(0, 4)}</p>
                </div>
                {poster_path !== null
                    ? <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                        effect="blur"
                      />
                    : <LazyLoadImage
                        src='../../../public/image-missing.png'
                        alt={title}
                        effect="blur"
                      />
                }
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
            <p>{title}</p>
        </div>
    </>)
}

export default ContentImg