import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ForgotPasswordAdmin, ForgotPasswordType } from '../../zod/routesAuth'
import { useMutation } from '@tanstack/react-query'
import { axiosPath } from '../../helpers/peticiones/path'
import { envs } from '../../configs/envs'
import { FormForgotPassword } from './helpers/helpers'
import { ClipLoader } from 'react-spinners'
import { ToastContainer } from 'react-toastify'
import { AlertError, AlertSucces } from '../../alerts/alerts'

export const ForgotPassword = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPath,
    onSuccess: (data) => {
      if(data.error) return AlertError(data.error)

      if(data) return AlertSucces('Se ha cambiado la contraseña')
    }
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordType>({ resolver: zodResolver(ForgotPasswordAdmin) })

  const onSubmit = handleSubmit((data) => {
    mutate({
      url: `${envs.API}/authPanel/forgotPassword`,
      data: data
    })

    FormForgotPassword.forEach((value) => {
      setValue(value, '')
    })
  })

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Recuperar contraseña
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onSubmit}
          className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="usuario" className="block text-sm font-medium leading-6 text-gray-900">
                Usuario
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                {...register('usuario')}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
            {
              errors.usuario && <span className='text-red-600'>{errors.usuario.message}</span>
            }
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="nuevaContraseña" className="block text-sm font-medium leading-6 text-gray-900">
                Nueva Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                {...register('nuevaContraseña')}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
            {
              errors.nuevaContraseña && <span className='text-red-600'>{errors.nuevaContraseña.message}</span>
            }
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="claveAdministrativa" className="block text-sm font-medium leading-6 text-gray-900">
                Clave Administrativa
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                {...register('claveAdministrativa')}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
            {
              errors.claveAdministrativa && <span className='text-red-600'>{errors.claveAdministrativa.message}</span>
            }
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full h-9 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {
                isPending ? <ClipLoader
                  color="#ffffff"
                  size={20}
                /> : <span>Cambiar</span>
              }
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center" />
    </div>
  )
}
