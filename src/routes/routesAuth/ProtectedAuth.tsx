import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAunthenticated } from '../../context/authenticated'
import { axiosPost } from '../../helpers/peticiones/post'
import { envs } from '../../configs/envs'
import { useEffect, useState } from 'react'

export const ProtectedAuth = () => {

    const { setAunthenticated } = useAunthenticated()
    const token = Cookies.get('login')
    const redirect = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const validateToken = async () => {
            try {
                setLoading(true)
                const validate = await axiosPost({
                    url: `${envs.API}/authPanel/validateToken`,
                    data: { token }
                })
                if (validate.error) return redirect('/')
            } catch (error) {
                throw Error(`${error}`)
            } finally {
                setLoading(false)
            }
            setAunthenticated()
        }
        validateToken()
    }, [token, setAunthenticated, redirect])

    return (
        loading ?
            <div className='h-screen w-full flex items-center justify-center'>
                <span className="loading loading-dots loading-lg"></span>
            </div> :
            <Outlet />
    )
}
