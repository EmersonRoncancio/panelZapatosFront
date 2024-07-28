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


export const LoginAdministrador = z.object({
    usuario: z.string().min(1, { message: 'El usuario es requerido' }),
    contraseña: z.string().min(1, {
        message: 'La contraseña es requerida'
    }).min(8, {
        message: 'Debe ser mayor a 8 digitos'
    }).max(20, {
        message: 'Debe ser menor a 20 digitos'
    })
})

export type LoginAdministradortype = z.infer<typeof LoginAdministrador>


export const ForgotPasswordAdmin = z.object({
    usuario: z.string().min(1, { message: 'El usuario es requerido' }),
    nuevaContraseña: z.string().min(1, {
        message: 'La contraseña es requerida'
    }).min(8, {
        message: 'Debe ser mayor a 8 digitos'
    }).max(20, {
        message: 'Debe ser menor a 20 digitos'
    }),
    claveAdministrativa: z.string().min(1, { message: 'La clave administrativa es requerida' })
})

export type ForgotPasswordType = z.infer<typeof ForgotPasswordAdmin>


export const CreateZapatos = z.object({
    nombre: z.string().min(1, {message: 'El nombre es requerido'}),
    marca: z.string().min(1, {message: 'La marca es requerida'}),
    talla: z.string().min(1, {message: 'La talla es requerida'}),
    color: z.string().min(1, {message: 'El color es requerido'}),
    precio: z.string().min(1, {message: 'El precio requerido'}),
    stock: z.string().min(1, {message: 'El stock es requerido'}),
    images: z.any()
})

export type CreateZapatoType = z.infer<typeof CreateZapatos>