import './singleProductMovieInfo.style.scss'
import { useState } from 'react'

function SingleProductMovieInfo({ info }) {

    const [selected, setSelected] = useState(false)

    return (<>
        {info && (
            <div className="SingleProduct-section-two">
                <div className="SingleProduct-section-two-info">
                    <h2>{info.original_title}</h2>
                    <p>{info.tagline}</p>
                    <p>{info.overview}</p>
                </div>
                <button onClick={()=> setSelected(!selected)}>
                    {selected ? "selected" : "choose"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill={selected ? 'crimson' : 'transparent'} width="20px" height="20px" viewBox="-5.5 0 24 24">
                        <path d="m0 2.089v21.911l6.545-6.26 6.544 6.26v-21.911c-.012-1.156-.951-2.089-2.109-2.089-.026 0-.051 0-.077.001h.004-8.724c-.022-.001-.047-.001-.073-.001-1.158 0-2.098.933-2.109 2.088v.001z"/>
                    </svg>
                </button>
            </div>
        )}
    </>)
}

export default SingleProductMovieInfo