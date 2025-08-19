import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useIframeQuery(id) {
    return useQuery({
        queryFn: async () => {
            const response = await fetch(
                `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en`
            )
            const data = await response.json()
            return data.results
        },
        queryKey: ['Single Product Iframe', id]
    })
}