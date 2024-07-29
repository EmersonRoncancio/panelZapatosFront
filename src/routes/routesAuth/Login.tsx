import { Link } from 'react-router-dom'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginAdministrador, LoginAdministradortype } from '../../zod/routesAuth'
import { useMutation } from '@tanstack/react-query'
import { axiosPost } from '../../helpers/peticiones/post'
import { envs } from '../../configs/envs'
import { formLoginAdmin, FormLoginAdmin } from './helpers/helpers'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useAunthenticated } from '../../context/authenticated'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertError } from '../../alerts/alerts'

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

    const renderError = (fieldName: keyof LoginAdministradortype, errors: FieldErrors<LoginAdministradortype>) => {
        const error = errors[fieldName];
        if (error && typeof error.message === 'string') {
            return <span className='text-red-600'>{error.message}</span>;
        }
        return null;
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                        Iniciar sesión en Zapatopia
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={onSubmit}
                        className="space-y-6">
                        {
                            formLoginAdmin.map((form, index) => {
                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                                {form.label}
                                            </label>
                                            {
                                                form.name === 'contraseña' ?
                                                    <div className="text-sm">
                                                        <Link to='/forgotPassword' className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                            Olvidaste tu contraseña?
                                                        </Link>
                                                    </div> :
                                                    null
                                            }
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                {...register(form.name)}
                                            />
                                        </div>
                                        {
                                            renderError(form.name, errors)
                                        }
                                    </div>
                                )
                            })
                        }
                        <div>
                            <button
                                type="submit"
                                className="flex w-full h-9 justify-center items-center btn btn-primary"
                            >
                                {
                                    isPending ?
                                        <span className="loading loading-dots loading-md"></span>
                                        : <span>Iniciar sesión</span>
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
