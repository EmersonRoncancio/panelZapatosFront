import { useQuery } from "@tanstack/react-query"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetPagination = ({querykey: [nombre, page], queryfn: funcion}: {querykey: [string,number], queryfn: ()=> Promise<any>}) => {

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: [nombre, page],
        queryFn: funcion,
    })

    return {
        data,
        isLoading
    }
}
