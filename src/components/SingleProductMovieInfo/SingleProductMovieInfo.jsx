import './singleProductMovieInfo.style.scss'
import { useState } from 'react'
import { useMovieInfoQuery } from "./useMovieInfoQuery.js"
import { LiaLocationArrowSolid } from "react-icons/lia"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx";

function SingleProductMovieInfo({ id }) {

    const { data, isError, isLoading } = useMovieInfoQuery(id)
    const [selected, setSelected] = useState(false)

    if(isLoading) return <>
        <div className='SingleProduct-iframe-info'>
            <ComponentLoading width={'200px'} height={'25px'}/>
            <ComponentLoading width={'200px'} height={'25px'}/>
        </div>
        <div className="SingleProduct-section-two">
            <ComponentLoading width={'200px'} height={'40px'}/>
            <ComponentLoading width={'250px'} height={'25px'}/>
            <ComponentLoading width={'90%'} height={'80px'}/>
            <ComponentLoading width={'200px'} height={'40px'}/>
        </div>
    </>
    if(isError) return <p className='error'>Error {isError}</p>

    return (<>
        <div className='SingleProduct-iframe-info'>
            <div className='SingleProduct-section-one-data'>
                <span>Release date</span><LiaLocationArrowSolid className='SingleProduct-icon-arrow-genre'/>
                <span>{data.release_date.split("-").join(" ")}</span>
            </div>
            {data.genres.length && <div className='SingleProduct-section-one-info'>
                <h3>Genre</h3><LiaLocationArrowSolid className='SingleProduct-icon-arrow-genre'/>
                {data.genres.map(({ id, name }) => (
                    <span key={id}>{name}</span>
                ))}
            </div>}
        </div>
        <div className="SingleProduct-section-two">
            <div className="SingleProduct-section-two-info">
                <h2>{data.original_title}</h2>
                <p>{data.tagline}</p>
                <p>{data.overview}</p>
            </div>
            <button onClick={()=> setSelected(!selected)}>
                {selected ? "selected" : "choose"}
                <svg xmlns="http://www.w3.org/2000/svg" fill={selected ? 'crimson' : 'transparent'} width="20px" height="20px" viewBox="-5.5 0 24 24">
                    <path d="m0 2.089v21.911l6.545-6.26 6.544 6.26v-21.911c-.012-1.156-.951-2.089-2.109-2.089-.026 0-.051 0-.077.001h.004-8.724c-.022-.001-.047-.001-.073-.001-1.158 0-2.098.933-2.109 2.088v.001z"/>
                </svg>
            </button>
        </div>
    </>)
}

export default SingleProductMovieInfo