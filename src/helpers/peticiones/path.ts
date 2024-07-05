import axios, { AxiosError } from "axios"

export const axiosPath = async ({ url, data }: { url: string, data: object }) => {
    try {
        const response = await axios.patch(url, data)
        return response.data
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}