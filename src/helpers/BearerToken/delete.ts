import axios, { AxiosError } from "axios"

export const axiosDeleteBearer = async ({ url, token }: { url: string, token: string }) => {
    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}