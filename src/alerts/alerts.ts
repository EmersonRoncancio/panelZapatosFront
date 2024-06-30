import { toast } from 'react-toastify'

export const AlertError = (mensaje: string) => toast.error(mensaje)

export const AlertSucces = (mensaje: string) => toast.success(mensaje)