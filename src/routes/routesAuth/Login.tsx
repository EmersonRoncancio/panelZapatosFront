import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginAdministrador, LoginAdministradortype } from '../../zod/routesAuth'
import { useMutation } from '@tanstack/react-query'
import { axiosPost } from '../../helpers/peticiones/post'
import { envs } from '../../configs/envs'
import { FormLoginAdmin } from './helpers/helpers'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useAunthenticated } from '../../context/authenticated'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertError } from '../../alerts/alerts'
import { ClipLoader } from 'react-spinners'

export const Login = () => {

    const { aunthenticated, setAunthenticated } = useAunthenticated()
    const navigate = useNavigate()
    const cookie = Cookies.get('login')

    const { mutate, isPending } = useMutation({
        mutationFn: axiosPost,
        onSuccess: (data) => {
            const HorasEnMilisegundos = 10800000;
            const Hora = new Date(Date.now() + HorasEnMilisegundos);
            if (data.error) {
                AlertError(data.error)
                return
            }
            Cookies.set('login', data.token, { expires: Hora })

            axiosPost({
                url: `${envs.API}/authPanel/validateToken`,
                data: { token: data.token }
            }).then(validate => {
                if (validate.error) return
                setAunthenticated()
            })
        }
    })

    const { register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<LoginAdministradortype>({ resolver: zodResolver(LoginAdministrador) })

    const onSubmit = handleSubmit((data) => {
        mutate({
            url: `${envs.API}/authPanel/login`,
            data: data
        })

        FormLoginAdmin.forEach((value) => {
            setValue(value, '')
        })
    })

    useEffect(() => {
        if (cookie && aunthenticated) {
            navigate('/home')
        }
    }, [cookie, aunthenticated, navigate])


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Iniciar sesión en Zapatopia
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={onSubmit}
                        className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('usuario')}
                                    type='text'
                                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                            </div>
                            {
                                errors.usuario && <span className='text-red-600'>{errors.usuario.message}</span>
                            }
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="text-sm">
                                    <Link to='/forgotPassword' className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register('contraseña')}
                                    type='password'
                                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                                {
                                    errors.contraseña && <span className='text-red-600'>{errors.contraseña.message}</span>
                                }
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full h-9 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {
                                    isPending ? <ClipLoader
                                        color="#ffffff"
                                        size={20}
                                    /> : <span>Iniciar sesión</span>
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes acceso?{' '}
                        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Registrate
                        </Link>
                    </p>
                </div>
                <ToastContainer
                    position='top-center' />
            </div>
        </>
    )
}
