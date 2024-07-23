import axios, { AxiosError } from "axios"

export const axiosPostBearer = async ({ url, data, token }: { url: string, data: object, token: string }) => {
    try {
        const response = await axios.post(url, data, {
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