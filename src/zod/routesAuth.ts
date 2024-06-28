import { z } from 'zod'

export const Admintrador = z.object({
    nombre: z.string().min(1, { message: 'El nombre es requerido' }),
    apellido: z.string().min(1, { message: 'El apellido es requerido' }),
    usuario: z.string().min(1, { message: 'El usuario es requerido' }),
    contraseña: z.string().min(1, {
        message: 'La contraseña es requerida'
    }).min(8, {
        message: 'Debe ser mayor a 8 digitos'
    }).max(20, {
        message: 'Debe ser menor a 20 digitos'
    }),
    claveAdministrativa: z.string().min(1, { message: 'La clave administrativa es requerida' })
})

export type AdministradorFormData = z.infer<typeof Admintrador>;