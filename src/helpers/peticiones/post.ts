import axios from "axios"

export const axiosPost = async(url: string, data: object) =>{
    return await axios.post(url, data)
}