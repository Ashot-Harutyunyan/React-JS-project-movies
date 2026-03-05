import ComponentLoading from "../ComponentLoading/ComponentLoading.jsx"
import { useLoadingArray } from "../hooks/useLoadingArray.js"

function SingleGenreLoading({ loadingNextPage }) {
    const loadingArray = useLoadingArray(20)

    if (loadingNextPage) {
        return (<>
                {loadingArray.map((_, index) => (
                    <div className="single-genre-container-movie" key={index}>
                        <ComponentLoading width="clamp(160px, 20vw, 260px)" height="clamp(80px, 10vw, 160px)" />
                        <ComponentLoading width="clamp(160px, 20vw, 260px)" height="clamp(60px, 8vw, 100px)" />
                    </div>
                ))}
            </>)
    }

    return <div className="scrollUp loading">
            <ComponentLoading width="300px" height="35px" />

            <div className="single-genre loading">
                {loadingArray.map((_, index) => (
                    <div className="single-genre-container-movie" key={index}>
                        <ComponentLoading width="clamp(160px, 20vw, 260px)" height="clamp(80px, 10vw, 160px)" />
                        <ComponentLoading width="clamp(160px, 20vw, 260px)" height="clamp(60px, 8vw, 100px)" />
                    </div>
                ))}
            </div>
    </div>
}

export default SingleGenreLoading