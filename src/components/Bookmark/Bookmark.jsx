import './bookmark.style.scss'
import { useState, useEffect } from 'react'
import { useAuth } from "../../ctx/AuthContext.jsx"
import { useModals } from "../../ctx/ModalsContext.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { getFavoritesArray, toggleFavoriteMovie } from "../../firebase/firebase.js"

function Bookmark({ variant, movie, onToggle }) {

    const [ language ] = useLanguage()
    const [ user ] = useAuth()
    const { openModal } = useModals()
    const [selected, setSelected] = useState(false)

    function isMovieInFavorites (favorites, movieId) {
        return favorites.some(
            (movie) => movie.id === movieId
        )
    }

    async function bookmarkClick(){
        if(!user) {
            openModal('authRequiredModal')
        } else {
            setSelected(!selected)
            await toggleFavoriteMovie(movie)

            if (onToggle) {
                setTimeout(() => {
                    onToggle()
                }, 300)
            }

        }
    }

    useEffect(() => {
        if (!user) {
            setSelected(false)
            return
        }

        const checkFavorite = async () => {
            const favorites = await getFavoritesArray()
            const exists = isMovieInFavorites(favorites, movie.id)
            setSelected(exists)
        }

        checkFavorite()
    }, [user, movie.id])


     return variant === 'button' ? <button onClick={async (e)=>{
             e.stopPropagation()
             await bookmarkClick()
         }}>
                {selected ? language.selected : language.choose}
                <div className={selected ? "bookmark active" : "bookmark"}>
                    <svg viewBox="0 0 32 32">
                        <g>
                            <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                        </g>
                    </svg>
                </div>
            </button>
    : <div className={selected ? "bookmark active" : "bookmark"}
                onClick={async (e) => {
                    e.preventDefault()
                    await bookmarkClick()
                }}>
        <svg viewBox="0 0 32 32">
            <g>
                <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
            </g>
        </svg>
    </div>
}

export default Bookmark