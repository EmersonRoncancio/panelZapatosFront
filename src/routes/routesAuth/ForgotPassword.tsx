import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { ForgotPasswordAdmin, ForgotPasswordType } from '../../zod/routesAuth'
import { useMutation } from '@tanstack/react-query'
import { axiosPath } from '../../helpers/peticiones/path'
import { envs } from '../../configs/envs'
import { formForgotPassword, FormForgotPassword } from './helpers/helpers'
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

  const renderError = (fieldName: keyof ForgotPasswordType, errors: FieldErrors<ForgotPasswordType>) => {
    const error = errors[fieldName];
    if (error && typeof error.message === 'string') {
      return <span className='text-red-600'>{error.message}</span>;
    }
    return null;
  };

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
          {
            formForgotPassword.map((form, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                      {form.label}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type={form.type}
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
