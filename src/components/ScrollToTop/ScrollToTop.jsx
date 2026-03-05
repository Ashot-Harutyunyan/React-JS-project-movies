import { useEffect } from "react"
import { useLocation } from "react-router"

function ScrollToTop() {
    const location = useLocation()

    useEffect(() => {

        window.history.scrollRestoration = "manual"

        window.scrollTo(0, 0)

    }, [location.pathname])

    return null
}

export default ScrollToTop
