import './searchMovies.style.scss'
import { useState } from "react"
import { useSearchQuery } from "./useSearchQuery.js"
import ContentImg from "../ContentImg/ContentImg.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { useLoadingArray } from "../hooks/useLoadingArray.js"

import { IoIosSearch } from "react-icons/io"
import { RxCrossCircled } from "react-icons/rx"

function SearchMovies() {

    const [language] = useLanguage()
    const [inputSearch, setInputSearch] = useState('')
    const [inputSubmit, setInputSubmit] = useState('')
    const [searchOrNot, setSearchOrNot] = useState(true)
    const { data, isError, isLoading, error } = useSearchQuery(language.url, inputSubmit)
    const arrayLoading = useLoadingArray(20)

    const handleSubmit = (e) => {
        e.preventDefault()
        setInputSubmit(e.target.SearchMovies.value)
    }

    if(isError) return <p className='error'>{error.message}</p>

    return (<section className='scrollUp'>
        <h2 className='SearchMovies-title'>{language.Search}</h2>
        <form className='form-search-movies' onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={inputSearch}
                    name="SearchMovies"
                    placeholder={language.SearchMovies}
                    onChange={(e) => {
                        setInputSearch(e.target.value)
                        if(e.target.value === '') {
                            setSearchOrNot(true)
                        } else setSearchOrNot(false)
                    }}
                />
                {searchOrNot
                    ? <IoIosSearch className='SearchMovies-search-icon' />
                    : <RxCrossCircled className='SearchMovies-Cross-icon'
                        onClick={()=> {
                            setInputSearch('')
                            setSearchOrNot(true)
                        }}
                      />
                }
            </div>
            <input type="submit" value={language.Search}/>
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
            : data.results.length ? data.results.map((elem) => {
                    return <div className='container-search-movies-div' key={elem.id}>
                        <ContentImg {...elem}/>
                    </div>
                })
            : <h2 className='search-nothing-found-message'>{language.nothingFound} <span>{inputSearch}</span></h2>
            }
        </div>
    </section>)
}

export default SearchMovies