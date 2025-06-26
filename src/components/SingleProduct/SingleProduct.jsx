import './singleProduct.style.scss'
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import modals from "../Modals/Modals.jsx";

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
                };

            }catch(err) {
                console.log(err)
            }
        },
        queryKey: [`Single Product ${id}`]
    })

    if(isLoading) return <h2 className='Loading'>Loading...</h2>
    if(isError) return <p className='error'>Error {isError}</p>

    return (<>
        <section className='SingleProduct-container scrollUp'>
            <div className="SingleProduct-section-one">
                {data.videos[0].key ? <iframe
                        src={`https://www.youtube.com/embed/${data.videos[0].key }`}
                        frameBorder="0"
                        allowFullScreen
                        title="Movie trailer"
                    ></iframe>
                    : <div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${trailerNotFound}`}
                            alt="No Trailer Found"
                            style={{ width: "650px", height: "350px" }}
                        />
                    </div>}
            </div>

        </section>
    </>)
}

export default SingleProduct