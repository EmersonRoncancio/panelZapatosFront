type TypeFormRegister = [
    'nombre',
    'apellido',
    'usuario',
    'contraseña',
    'claveAdministrativa'
]

export const FormRegister: TypeFormRegister = [
    'nombre',
    'apellido',
    'usuario',
    'contraseña',
    'claveAdministrativa'
]


type TypeLoginAdmin = [
    'usuario',
    'contraseña'
]

export const FormLoginAdmin: TypeLoginAdmin = [
    'usuario',
    'contraseña'
]


type TypeForgotPassword = [
    'usuario',
    'nuevaContraseña',
    'claveAdministrativa'
]

export const FormForgotPassword: TypeForgotPassword = [
    'usuario',
    'nuevaContraseña',
    'claveAdministrativa'
]

type typeRegisterAdmin = 'nombre' | 'apellido' | 'usuario' | 'contraseña' | 'claveAdministrativa'

interface typeFormRegisterAmdin {
    label: string,
    name: typeRegisterAdmin
}

export const formRegisterAdmin: typeFormRegisterAmdin[] = [
    {
        label: 'Nombre',
        name: 'nombre'
    },
    {
        label: 'Apellido',
        name: 'apellido'
    },
    {
        label: 'Usuario',
        name: 'usuario'
    },
    {
        label: 'Contraseña',
        name: 'contraseña'
    },
    {
        label: 'Clave Administrativa',
        name: 'claveAdministrativa' 
    }
]

type typeLoginAdmin = 'usuario' | 'contraseña'

interface typeformLoginAdmin {
    label: string,
    name: typeLoginAdmin
}

export const formLoginAdmin: typeformLoginAdmin[] = [
    {
        label: 'Usuario',
        name: 'usuario'
    },
    {
        label: 'Apellido',
        name: 'contraseña'
    },
]

type TypesForgotPassword = 'usuario' | 'nuevaContraseña' | 'claveAdministrativa'

interface typeFormForgotPassword {
    label: string,
    name: TypesForgotPassword
}

export const formForgotPassword: typeFormForgotPassword[] = [
    {
        label: 'Usuario',
        name: 'usuario'
    },
    {
        label: 'Nueva Contraseña',
        name: 'nuevaContraseña'
    },
    {
        label: 'Clave Administrativa',
        name: 'claveAdministrativa' 
    }
]





