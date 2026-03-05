import { useInfiniteQuery } from "@tanstack/react-query"
import { BASE_URL, API_KEY } from "../../apiConfig.js"

export function useSingleGenreQuery(url, id) {
    return useInfiniteQuery({
        queryFn: async ({ pageParam = 1 }) => {
            const response = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${url}&with_genres=${id}&page=${pageParam}`
            )
            const data = await response.json()

            if (pageParam === 1) {
                const genresResponse = await fetch(
                    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${url}`
                )
                const genresData = await genresResponse.json()
                data.genreName = genresData.genres.find(g => g.id === parseInt(id))?.name || ''
            }

            return data
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.page < lastPage.total_pages && allPages.length < 10) {
                return lastPage.page + 1
            }
            return undefined
        },
        queryKey: ["Single Genre", id, url]
    })
}