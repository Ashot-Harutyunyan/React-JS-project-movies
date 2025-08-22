import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../apiConfig.js"

export function useSearchQuery(url, inputSubmit){
    return useQuery({
        queryFn: async () => {
            if(inputSubmit !== ''){
                const response = await fetch(
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${inputSubmit}&language=${url}`
                )
                return await response.json()
            }else {
                const response = await fetch(
                    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${url}&page=1`
                )
                return await response.json()
            }
        },
        queryKey: ["Search Movies", url, inputSubmit]
    })
}