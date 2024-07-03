import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AdministradorFormData, Admintrador } from '../zod/routesAuth'
import { axiosPost } from '../helpers/peticiones/post'
import { envs } from '../configs/envs'
import { FormRegister } from './helpers/helpers'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertError, AlertSucces } from '../alerts/alerts'
import { ClipLoader } from 'react-spinners'

export const Register = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPost,
    onSuccess: (data) => {
      if (data && data.error) return AlertError(data.error)
      if (data) return AlertSucces('Se ha registrado con exito')
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<AdministradorFormData>({ resolver: zodResolver(Admintrador) })

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      url: `${envs.API}/authPanel`,
      data: data
    })

    FormRegister.forEach((value) => {
      setValue(value, '')
    })
  })

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
            Registrate
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={onSubmit}
            className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('nombre')}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
              {
                errors.nombre && <span className='text-red-600'>{errors.nombre.message}</span>
              }
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                  Apellido
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('apellido')}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
              {
                errors.apellido && <span className='text-red-600'>{errors.apellido.message}</span>
              }
            </div>

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
                <label htmlFor="contraseña" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  {...register('contraseña')}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
              {
                errors.contraseña && <span className='text-red-600'>{errors.contraseña.message}</span>
              }
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="contraseña" className="block text-sm font-medium leading-6 text-gray-900">
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
                  /> : <span>Registrar</span>
                }
              </button>
            </div>
          </form>
        </div>
        <ToastContainer
          position="top-center" />
      </div>
    </>
  )
}
