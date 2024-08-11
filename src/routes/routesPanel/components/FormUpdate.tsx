import React, { useState } from "react";
import { Imagen, Zapato } from "../../../context/helpers/types";
import { CreateZapatos, CreateZapatoType } from "../../../zod/routesAuth";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCreateZapato } from "../helpers/helpers";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { envs } from "../../../configs/envs";
import Cookies from 'js-cookie'
import { axiosPutBearer } from "../../../helpers/BearerToken/put";
import { useZapatos } from "../../../context/zapatos";

type typesProps = {
    setModal: React.Dispatch<React.SetStateAction<string | null>>,
    zapato: Zapato,
    alertSucces: (message: string) => void,
    alertError: (message: string) => void
};

export const FormUpdate: React.FC<typesProps> = ({ setModal, zapato, alertSucces, alertError }) => {

    const { setZapatos, getzapatos } = useZapatos()
    const [files, setFiles] = useState<(Imagen | string)[]>(zapato.imagen)
    const [fileIMage, SetFIleIMage] = useState<File[]>([])
    const [fileDelete, setFileDelete] = useState<string[]>([])

    const { isPending, mutate } = useMutation({
        mutationFn: axiosPutBearer,
        onSuccess: (data) => {
            if (data.error) return alertError(data.error)
            if (data) {
                const arrNewZapatos = getzapatos.map((zapato) => {
                    if (data.zapato.id === zapato.id) {
                        return zapato = data.zapato
                    }
                    return zapato
                })
                setZapatos(arrNewZapatos)
                return alertSucces('Actualizacion con exito')
            }
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateZapatoType>({
        resolver: zodResolver(CreateZapatos),
        defaultValues: {
            nombre: zapato.nombre,
            marca: zapato.marca,
            talla: zapato.talla.toString(),
            color: zapato.color,
            precio: zapato.precio.toString(),
            stock: zapato.stock.toString(),
            images: zapato.imagen
        }
    })

    const onSubmit = handleSubmit((value) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { images, ...formValue } = value

        const formData = new FormData();
        //se agrega los datos a la constante de tipo formData, para manejera envio multiple de imagenes
        fileIMage.forEach((file) => {
            formData.append('image', file as File | string);
        });

        fileDelete.forEach((deletes) => {
            formData.append(`imagesDelete`, deletes)
        });

        Object.entries(formValue).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });

        mutate({
            url: `${envs.API}/zapatos/update/${zapato.id}`,
            data: formData,
            token: Cookies.get('login') || ''
        })
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const arrFiles = Array.from(event.target.files)

            SetFIleIMage((preveImages) => [...preveImages, ...arrFiles])

            const urlsImgs = arrFiles.map(img => URL.createObjectURL(img))
            setFiles((prevUrls) => [...prevUrls, ...urlsImgs])
        }
    }

    const handleDeleteIMage = (PublicId: string, indice: number) => {
        const arrFIlesDelete: string[] = []
        if (PublicId === '') {
            const deleteF = files
            deleteF.splice(indice, 1)
            setFiles(() => [...deleteF])
            return
        }

        arrFIlesDelete.push(PublicId)
        setFileDelete((prev) => [...prev, ...arrFIlesDelete])

        const deleteF = files
        deleteF.splice(indice, 1)
        setFiles(() => [...deleteF])
    }

    const renderError = (fieldName: keyof CreateZapatoType, errors: FieldErrors<CreateZapatoType>) => {
        const error = errors[fieldName];
        if (error && typeof error.message === 'string') {
            return <span className='text-red-600'>{error.message}</span>;
        }
        return null;
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center'>
            <div className="w-[70%] h-[80vh] overflow-auto bg-white rounded-2xl relative">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-3 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Editar
                            </h2>
                        </div>

                        <form
                            onSubmit={onSubmit}
                            className="space-y-6">
                            {
                                formCreateZapato.map((form, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                                    {form.label}
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
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
                                <div className="flex items-center justify-between">
                                    <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                                        Imagenes
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <label className="btn btn-neutral w-full">
                                        Agregar Imagenes
                                        <input
                                            hidden
                                            type="file"
                                            multiple
                                            accept='image/*'
                                            {...register('images')}
                                            onChange={handleChange}
                                        />
                                    </label>

                                </div>
                            </div>

                            <div className="grid grid-cols-3 justify-center items-center justify-items-center content-center gap-1">
                                {
                                    files.map((image, index) => {
                                        return (
                                            <div key={index} className="card w-28 h-24 overflow-hidden relative">
                                                <div
                                                    onClick={() => handleDeleteIMage(typeof (image) === 'string' ? '' : image.public_id, index)}
                                                    className="absolute right-2 top-2 rounded-full bg-red-600 hover:bg-red-700 p-1">
                                                    <MdDelete size={25} className="text-white" />
                                                </div>
                                                <img

                                                    className="w-full h-full object-cover" src={typeof (image) === 'string' ? image : image.url} alt="" />
                                            </div>
                                        )
                                    })
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
                                            : <span>Actualizar</span>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="absolute top-0 right-0 m-3">
                    <button
                        onClick={() => setModal(null)}
                        className="flex w-full h-9 justify-center items-center btn btn-error rounded-full">
                        <IoClose size={20} />
                    </button>
                </div>
            </div>
        </div>

    )
}
