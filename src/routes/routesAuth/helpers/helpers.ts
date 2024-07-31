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
    name: typeRegisterAdmin,
    type: string
}

export const formRegisterAdmin: typeFormRegisterAmdin[] = [
    {
        label: 'Nombre',
        name: 'nombre',
        type: 'text'
    },
    {
        label: 'Apellido',
        name: 'apellido',
        type: 'text'
    },
    {
        label: 'Usuario',
        name: 'usuario',
        type: 'text'
    },
    {
        label: 'Contraseña',
        name: 'contraseña',
        type: 'password'
    },
    {
        label: 'Clave Administrativa',
        name: 'claveAdministrativa',
        type: 'password'
    }
]

type typeLoginAdmin = 'usuario' | 'contraseña'

interface typeformLoginAdmin {
    label: string,
    name: typeLoginAdmin,
    type: string
}

export const formLoginAdmin: typeformLoginAdmin[] = [
    {
        label: 'Usuario',
        name: 'usuario',
        type: 'text'
    },
    {
        label: 'Contraseña',
        name: 'contraseña',
        type: 'password'
    },
]

type TypesForgotPassword = 'usuario' | 'nuevaContraseña' | 'claveAdministrativa'

interface typeFormForgotPassword {
    label: string,
    name: TypesForgotPassword,
    type: string
}

export const formForgotPassword: typeFormForgotPassword[] = [
    {
        label: 'Usuario',
        name: 'usuario',
        type: 'text'
    },
    {
        label: 'Nueva Contraseña',
        name: 'nuevaContraseña',
        type: 'password'
    },
    {
        label: 'Clave Administrativa',
        name: 'claveAdministrativa' ,
        type: 'password'
    }
]





