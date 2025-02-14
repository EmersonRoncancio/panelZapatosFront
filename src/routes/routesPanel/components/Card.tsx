import React, { useState } from 'react'
import { Zapato } from '../../../context/helpers/types'
import Cookies from 'js-cookie'
import { useZapatos } from '../../../context/zapatos'
import { axiosDeleteBearer } from '../../../helpers/BearerToken/delete'
import { envs } from '../../../configs/envs'

type typesProps = {
    setModal: React.Dispatch<React.SetStateAction<string | null>>,
    setZapato: React.Dispatch<React.SetStateAction<Zapato>>
    zapato: Zapato,
    alert: (message: string) => void
};

export const Card: React.FC<typesProps> = ({ zapato, setZapato, alert, setModal }) => {

    const { setZapatos, getzapatos } = useZapatos()
    const [deleLoading, setDeleLoading] = useState(false)

    const DeleteZapato = async (id: string) => {
        try {
            setDeleLoading(true)
            const token = Cookies.get('login') || ''
            const { message } = await axiosDeleteBearer({
                url: `${envs.API}/zapatos/delete/${id}`,
                token: token
            })
            console.log(message)
            const arrZapatos = getzapatos
            const arrNewZapatos = arrZapatos.filter((zapato) => zapato.id !== id)
            setZapatos(arrNewZapatos)
        } catch (error) {
            throw Error(`${error}`)
        } finally {
            setDeleLoading(false)
            alert('Eliminacion con exito')
        }
    }

    return (
        <>
            <div className="card bg-base-100 w-64 h-[345px] shadow-xl">
                <figure>
                    <img
                        src={zapato.imagen[0].url}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {zapato.nombre}
                    </h2>
                    <p>{zapato.marca} {zapato.nombre}</p>
                    <div
                        className="card-actions justify-end">
                        <button
                            onClick={() => {
                                setModal('Open')
                                setZapato(zapato)
                            }}
                            className="btn btn-accent">Editar</button>
                        <button
                            onClick={() => DeleteZapato(zapato.id)}
                            className="btn btn-outline btn-error">{
                                deleLoading ?
                                    <span className="loading loading-dots loading-md"></span>
                                    : <span>Eliminar</span>
                            }</button>
                    </div>
                </div>
            </div>
        </>
    )
}
