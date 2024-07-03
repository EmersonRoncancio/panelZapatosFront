import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAunthenticated } from '../context/authenticated'
import { axiosPost } from '../helpers/peticiones/post'
import { envs } from '../configs/envs'
import { useEffect } from 'react'

export const ProtectedAuth = () => {

    const { setAunthenticated } = useAunthenticated()
    const token = Cookies.get('login')
    const redirect = useNavigate()

    useEffect(() => {
        const validateToken = async () => {
            const validate = await axiosPost({
                url: `${envs.API}/authPanel/validateToken`,
                data: { token }
            })
            if (validate.error) return redirect('/')
            setAunthenticated()
        }
        validateToken()
    }, [token, setAunthenticated, redirect])

    return (
        <Outlet />
    )
}
