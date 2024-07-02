import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

export const ProtectedAuth = () => {

    const cookie = Cookies.get('login')

    if(!cookie) return  <Navigate to='/' replace/>

    return (
        <Outlet/>
    )
}
