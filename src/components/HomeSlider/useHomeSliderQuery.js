import { useQuery } from "@tanstack/react-query"
import { UNSPLASH_API_KEY, UNSPLASH_BASE_URL } from '../../apiConfig.js'

export function useHomeSliderQuery(){
    return useQuery({
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 5000))
            const response = await fetch(
                `${UNSPLASH_BASE_URL}/search/photos?query=movie&client_id=${UNSPLASH_API_KEY}`
            )
            return response.json()
        },
        queryKey: ['Movies Slider']
    })
}