import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useIframeQuery(id, url, dataImg) {
    return useQuery({
        queryFn: async () => {
            const response = await fetch(
                `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${url}`
            )
            const data = await response.json()

            if (!data.results?.length && url !== 'en-US') {
                const fallbackRes = await fetch(
                    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
                )
                const fallbackData = await fallbackRes.json()
                return { videos: fallbackData.results, fallbackImage: dataImg }
            }

            return { videos: data.results, fallbackImage: dataImg }
        },
        queryKey: ["Single Product Iframe", id, url, dataImg],
        enabled: !!dataImg,
    })
}