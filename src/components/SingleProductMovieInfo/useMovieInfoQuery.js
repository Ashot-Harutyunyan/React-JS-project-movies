import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useMovieInfoQuery(id, url) {
    return useQuery({
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${url}`)
            let data = await res.json()

            if (!data.overview) {
                const fallbackRes = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
                const fallbackData = await fallbackRes.json()

                data = { ...fallbackData }
            }

            return data
        },
        queryKey: ["Single Product Info", id, url],
    })
}
