import axios, { AxiosError } from "axios"

export const axiosPutBearer = async ({ url, data, token }: { url: string, data: object, token: string }) => {
    try {
        const response = await axios.put(url, data, {
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