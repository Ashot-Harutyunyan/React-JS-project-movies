import './searchMovies.style.scss'
import { useState } from "react"
import { useSearchQuery } from "./useSearchQuery.js"
import ContentImg from "../ContentImg/ContentImg.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

import { IoIosSearch } from "react-icons/io"
import { RxCrossCircled } from "react-icons/rx"

const initialUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

function SearchMovies() {

    const [url, setUrl] = useState(initialUrl)
    const [inputSearch, setInputSearch] = useState('')
    const [searchOrNot, setSearchOrNot] = useState(true)
    const { data, isError, isLoading } = useSearchQuery(url)
    const arrayLoading = new Array(20).fill(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputSearch === '') {
            setUrl(initialUrl)
        }else {
            const newUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${inputSearch}&language=en-US`
            setUrl(newUrl)
        }
    }

    if(isError) return <p className='error'>Error {isError}</p>

    return (<section className='scrollUp'>
        <h2 className='SearchMovies-title'>Search</h2>
        <form className='form-search-movies' onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={inputSearch}
                    name="SearchMovies"
                    placeholder="Search Movies"
                    onChange={(e) => {
                        setInputSearch(e.target.value)
                        if(e.target.value === '') {
                            setSearchOrNot(true)
                            setUrl(initialUrl)
                        } else setSearchOrNot(false)
                    }}
                />
                {searchOrNot
                    ? <IoIosSearch className='SearchMovies-search-icon' />
                    : <RxCrossCircled className='SearchMovies-Cross-icon'
                        onClick={()=> {
                            setInputSearch('')
                            setSearchOrNot(true)
                            setUrl(initialUrl)
                        }}
                      />
                }
            </div>
            <input type="submit" value="Search"/>
        </form>
        <div className="container-search-movies">
            {isLoading
            ? arrayLoading.map((_, i) => {
                return <div key={i} className='container-search-movies-div'>
                    <div className='SwiperSlide-container'>
                        <ComponentLoading width={'100%'} height={'100%'}/>
                    </div>
                </div>
            })
            : data.results.map((elem) => {
                if(elem.backdrop_path){
                    return <div className='container-search-movies-div' key={elem.id}>
                        <ContentImg {...elem}/>
                    </div>
                }})
            }
        </div>
    </section>)
}

export default SearchMovies