import { useQuery } from "@tanstack/react-query"

export function useSearchQuery(url){
    return useQuery({
        queryFn: async () => {
            const response = await fetch(url)
            return await response.json()
        },
        queryKey: ["Search Movies", url]
    })
}