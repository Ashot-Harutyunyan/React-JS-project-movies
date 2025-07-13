import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useMovieInfoQuery(id) {
    return useQuery({
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            return response.json()
        },
        queryKey: [`Single Product Info ${id}`]
    })
}