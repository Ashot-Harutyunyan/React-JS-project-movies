import { useState, useEffect } from "react"
import {Link} from "react-router"
import {TbArrowBigRightLines} from "react-icons/tb"
import MoviesByGenre from "../MoviesByGenre/MoviesByGenre.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"

function HomeContext({data}) {

    const [language] = useLanguage()
    const [desiredLength, setDesiredLength] = useState(2)
    const [lastTrigger, setLastTrigger] = useState(0)
    const result = data.slice(0, desiredLength).concat(Array(data.length - desiredLength).fill(null))

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= lastTrigger + 200) {
                setDesiredLength((prev) => {
                    if (prev < data.length) {
                        return prev + 1
                    }
                    return prev
                })
                setLastTrigger((prev) => prev + 200)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastTrigger, data.length])

    return (<>
        {result.map((item, index)=>{
            return <div key={index}>
                <div className='genre-container'>
                    {item?.name ? <div  className={language.homePage !== 'Watch all' ? 'home-context-ru' : ''}>
                        <h2 className='genre-name'>{item.name}</h2>
                        <Link to={`/${item.name}/${item.id}`}>{language.homePage}
                            <TbArrowBigRightLines className="home-icon-arrow-right"/>
                        </Link>
                    </div> :
                    <div>
                        <ComponentLoading width={'clamp(10px, 10vw, 250px)'} height={'clamp(20px, 5vw, 40px)'}/>
                        <ComponentLoading width={'95px'} height={'25px'}/>
                    </div>}
                </div>
                {item?.id ? <MoviesByGenre genreId={item.id}/> : <MoviesByGenre/>}
            </div>
        })}
    </>)
}

export default HomeContext