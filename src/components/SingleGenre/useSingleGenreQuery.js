import { useInfiniteQuery } from "@tanstack/react-query"
import { BASE_URL, API_KEY } from "../../apiConfig.js"

export function useSingleGenreQuery(url, id) {
    return useInfiniteQuery({
        queryFn: async ({ pageParam = 1 }) => {
            const response = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${url}&with_genres=${id}&page=${pageParam}`
            )
            return response.json()
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