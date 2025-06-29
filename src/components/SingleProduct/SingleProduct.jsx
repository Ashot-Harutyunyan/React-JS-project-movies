import './singleProduct.style.scss'
import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import SingleProductIframe from "../SingleProductIframe/SingleProductIframe.jsx"
import SingleProductMovieInfo from '../SingleProductMovieInfo/SingleProductMovieInfo.jsx'

import { LiaLocationArrowSolid } from "react-icons/lia"

function SingleProduct() {

    const { id } = useParams()
    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const { data, isError, isLoading } = useQuery({
        queryFn: async () => {
            try {
                const [videosRes, creditsRes, movieRes] = await Promise.all([
                    fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en`),
                    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en`),
                    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
                ])

                const [videos, credits, movie] = await Promise.all([
                    videosRes.json(),
                    creditsRes.json(),
                    movieRes.json()
                ])

                return {
                    videos: videos.results,
                    credits: credits.cast.filter(actor => actor.profile_path),
                    movie: movie
                }

            }catch(err) {
                console.log(err)
            }
        },
        queryKey: [`Single Product ${id}`]
    })

    if(isLoading) return <h2 className='Loading'>Loading...</h2>
    if(isError) return <p className='error'>Error {isError}</p>

    console.log(data.videos, data.credits, data.movie)

    return <section className='SingleProduct-container scrollUp'>
            <div className="SingleProduct-section-one">
                <SingleProductIframe data={data.videos} dataImg={data.movie.backdrop_path}/>
                <p>{data.movie.release_date.split("-").join(" ")}</p>
                <div className='SingleProduct-section-one-info'>
                    <h3>Genre</h3><LiaLocationArrowSolid className='SingleProduct-icon-arrow-genre'/>
                    {data.movie.genres.map(({ id, name }) => (
                        <span key={id}> {name} </span>
                    ))}
                </div>
            </div>
            <SingleProductMovieInfo info={data.movie}/>
    </section>
}

export default SingleProduct