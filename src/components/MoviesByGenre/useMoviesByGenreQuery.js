import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from '../../apiConfig.js'

export function useMoviesByGenreQuery(arg) {
    return useQuery({
        queryFn: async ()=> {
            await new Promise(resolve => setTimeout(resolve, 5000))
            const response = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en&with_genres=${arg.genreId}&page=1`
            )
            return response.json()
        },
        queryKey: [`Genre ${arg.genreName}`]
    })
}