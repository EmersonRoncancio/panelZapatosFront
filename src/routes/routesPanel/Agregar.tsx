import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { axiosPostBearer } from "../../helpers/BearerToken/post"
import { envs } from "../../configs/envs"
import Cookies from 'js-cookie'
import { ToastContainer } from "react-toastify"
import { AlertError, AlertSucces } from "../../alerts/alerts"
import { CreateZapato } from "./helpers/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateZapatos, CreateZapatoType } from "../../zod/routesAuth"

export const Agregar = () => {

    const [files, setFiles] = useState<string[]>()

    const { isPending, mutate } = useMutation({
        mutationFn: axiosPostBearer,
        onSuccess: (data) => {
            if (data.error) return AlertError(data.error)
            if (data) return AlertSucces('Creacion Exitosa')
        }
    })

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateZapatoType>({ resolver: zodResolver(CreateZapatos) })

    const onSubmit = handleSubmit((value) => {
        const { images, ...formValue } = value

        const formData = new FormData();
        const arrImages = Array.from(images)

        //se agrega los datos a la constante de tipo formData, para manejera envio multiple de imagenes
        arrImages.forEach((file) => {
            formData.append('image', file as File);
        });

        Object.entries(formValue).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });

        mutate({
            url: `${envs.API}/zapatos/`,
            data: formData,
            token: Cookies.get('login') || ''
        })

        CreateZapato.forEach((value) => {
            setValue(value, '')
        })
        setFiles([])
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const arrFiles = Array.from(event.target.files)

            const urlsImgs = arrFiles.map(img => {
                return URL.createObjectURL(img)
            })
            setFiles(urlsImgs)
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Agregar Zapato
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
                                className="input input-bordered w-full"
                                {...register('nombre')}
                            />
                        </div>
                        {
                            errors.nombre && <span className='text-red-600'>{errors.nombre.message}</span>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="marca" className="block text-sm font-medium leading-6 text-gray-900">
                                Marca
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('marca')}
                            />
                        </div>
                        {
                            errors.marca && <span className='text-red-600'>{errors.marca.message}</span>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="talla" className="block text-sm font-medium leading-6 text-gray-900">
                                Talla
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('talla')}
                            />
                        </div>
                        {
                            errors.talla && <span className='text-red-600'>{errors.talla.message}</span>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                                Color
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('color')}
                            />
                        </div>
                        {
                            errors.color && <span className='text-red-600'>{errors.color.message}</span>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
                                Precio
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('precio')}
                            />
                        </div>
                        {
                            errors.precio && <span className='text-red-600'>{errors.precio.message}</span>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('stock')}
                            />
                        </div>
                        {
                            errors.stock && <span className='text-red-600'>{errors.stock.message}</span>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                                Imagenes
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="file"
                                multiple
                                accept='image/*'
                                className="file-input file-input-bordered file-input-primary w-full"
                                {...register('images')}
                                onChange={handleChange} />
                        </div>
                    </div>

                    {
                        files?.map((image) => {
                            return (
                                <img className="card" src={image} alt="" />
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
                                    : <span>Guardar</span>
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
