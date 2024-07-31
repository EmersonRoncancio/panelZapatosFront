import axios, { AxiosError } from "axios";

export const axiosGet = async ({ url }: { url: string }) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}