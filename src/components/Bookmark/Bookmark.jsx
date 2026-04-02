import './bookmark.style.scss'
import { useState, useEffect } from 'react'
import { useAuth } from "../../ctx/AuthContext.jsx"
import { useModals } from "../../ctx/ModalsContext.jsx"
import { useLanguage } from "../../ctx/LanguageContext.jsx"
import { getFavoritesArray, toggleFavoriteMovieAllLocales } from "../../firebase/firebase.js"

function Bookmark({ variant, movie, onToggle }) {

    const [ language ] = useLanguage()
    const [ user ] = useAuth()
    const { openModal } = useModals()
    const [selected, setSelected] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            setSelected(false)
            return
        }

        const checkFavorite = async () => {
            const favorites = await getFavoritesArray(language.url)
            setSelected(favorites.some((fav) => fav.id === movie.id))
        }

        checkFavorite()
    }, [user, movie.id])

    async function bookmarkClick() {
        if (!user) {
            openModal('authRequiredModal')
            return
        }

        if (loading) return

        setLoading(true)
        try {
            const wasAdded = await toggleFavoriteMovieAllLocales(movie)
            setSelected(wasAdded)

            if (onToggle) {
                setTimeout(() => onToggle(), 300)
            }
        } catch (err) {
            console.error("Bookmark error:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        await bookmarkClick()
    }

    const bookmarkClass = `bookmark${selected ? ' active' : ''}${loading ? ' loading' : ''}`

    const svgIcon = (
        <svg viewBox="0 0 32 32">
            <g>
                <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
            </g>
        </svg>
    )

    if (variant === 'button') {
        return (
            <button onClick={handleClick} disabled={loading}>
                {selected ? language.selected : language.choose}
                <div className={bookmarkClass}>
                    {svgIcon}
                </div>
            </button>
        )
    }

    return (
        <div className={bookmarkClass} onClick={handleClick}>
            {svgIcon}
        </div>
    )
}

export default Bookmark