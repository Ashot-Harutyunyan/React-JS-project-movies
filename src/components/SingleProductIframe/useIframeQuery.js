import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useIframeQuery(id, url) {
    return useQuery({
        queryFn: async () => {
            const response = await fetch(
                `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${url}`
            )
            const data = await response.json()

            if (!data.results?.length) {
                const fallbackRes = await fetch(
                    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
                )
                const fallbackData = await fallbackRes.json()
                return fallbackData.results
            }

            return data.results
        },
        queryKey: ["Single Product Iframe", id, url],
    })
}