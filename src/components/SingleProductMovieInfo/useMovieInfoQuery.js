import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useMovieInfoQuery(id, url, handleChangeStateImg) {
    return useQuery({
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${url}`)
            const data = await res.json()

            if (!data.overview && url !== 'en-US') {
                const fallbackRes = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
                handleChangeStateImg(fallbackRes.backdrop_path)
                return await fallbackRes.json()
            }

            handleChangeStateImg(data.backdrop_path)

            return data
        },
        queryKey: ["Single Product Info", id, url],
    })
}
