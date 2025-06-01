import './home.style.scss'
import { useQuery } from "@tanstack/react-query"
import MoviesByGenre from "../MoviesByGenre/MoviesByGenre.jsx"
import { Link } from 'react-router'
import { TbArrowBigRightLines } from "react-icons/tb"
import HomeSlider from "../HomeSlider/HomeSlider.jsx";

function Home() {

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const { data, isError, isLoading} = useQuery({
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`)
            return response.json()
        },
        queryKey: ['Movies by genre']
    })

    if(isLoading) return <h2 className='Loading'>Loading...</h2>
    if(isError) return <p className='error'>Error {isError}</p>

    return (<>
        <HomeSlider/>
        {data.genres.map(({id, name})=>{
            return <div key={id}>
                <div className='genre-container'>
                    <div>
                        <h2 className='genre-name'>{name}</h2>
                        <Link to={`/${name}/${id}`}>Watch all
                            <TbArrowBigRightLines className="home-icon-arrow-right"/>
                        </Link>
                    </div>
                </div>
                <MoviesByGenre genreName={name} genreId={id}/>
            </div>
        })}
    </>)
}

export default Home