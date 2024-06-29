import axios, { AxiosError } from "axios"

export const axiosPost = async ({ url, data }: { url: string, data: object }) => {
    try {
        const response = await axios.post(url, data)
        return response.data
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}