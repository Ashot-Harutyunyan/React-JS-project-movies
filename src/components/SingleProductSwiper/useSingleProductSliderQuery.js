import { useQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL} from "../../apiConfig.js";

export function useSingleProductSliderQuery(id){
    return useQuery({
        queryFn: async ()=> {
            const response = await fetch(
                `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en`
            )
            const data = await response.json()
            return data.cast.filter(actor => actor.profile_path)
        },
        queryKey: [`Single Product actors ${id}`]
    })
}