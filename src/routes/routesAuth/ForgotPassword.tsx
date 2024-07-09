import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ForgotPasswordAdmin, ForgotPasswordType } from '../../zod/routesAuth'
import { useMutation } from '@tanstack/react-query'
import { axiosPath } from '../../helpers/peticiones/path'
import { envs } from '../../configs/envs'
import { FormForgotPassword } from './helpers/helpers'
import { ToastContainer } from 'react-toastify'
import { AlertError, AlertSucces } from '../../alerts/alerts'

export const ForgotPassword = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPath,
    onSuccess: (data) => {
      if (data.error) return AlertError(data.error)

      if (data) return AlertSucces('Se ha cambiado la contraseña')
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
                className="input input-bordered w-full"
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
                className="input input-bordered w-full"
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
                className="input input-bordered w-full"
              />
            </div>
            {
              errors.claveAdministrativa && <span className='text-red-600'>{errors.claveAdministrativa.message}</span>
            }
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full h-9 justify-center items-center btn btn-primary"
            >
              {
                isPending ?
                  <span className="loading loading-dots loading-md"></span>
                  : <span>Cambiar</span>
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
