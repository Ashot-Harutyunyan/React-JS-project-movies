import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from '../../apiConfig.js'

export function useHomeContextQuery(language){
    return useQuery({
        queryFn: async () => {
            const response = await fetch(
                `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&${language.url}`
            )
            return await response.json()
        },
        queryKey: [`Movies by genre ${language.url}`],
    })
}