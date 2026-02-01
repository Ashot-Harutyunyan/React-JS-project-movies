import { useMemo } from "react"

export function useLoadingArray(count = 0, content = null) {
    return useMemo(() => {
        return new Array(count).fill(content)
    }, [count])
}