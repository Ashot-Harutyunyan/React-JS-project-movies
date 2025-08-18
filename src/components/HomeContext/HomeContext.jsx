import {Link} from "react-router"
import {TbArrowBigRightLines} from "react-icons/tb"
import MoviesByGenre from "../MoviesByGenre/MoviesByGenre.jsx"
import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"

function HomeContext({data}) {

    const [language] = useLanguage()

    return (<>
        {data.map((item, index)=>{
            return <div key={item?.id || index}>
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
                {item?.name ? <MoviesByGenre genreName={item.name} genreId={item.id}/> : <MoviesByGenre/>}
            </div>
        })}
    </>)
}

export default HomeContext