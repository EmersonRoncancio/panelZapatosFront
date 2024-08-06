import React from "react";
import { Zapato } from "../../../context/helpers/types";

type typesProps = {
    setValue: React.Dispatch<React.SetStateAction<string | null>>,
    zapato: Zapato
};

export const FormUpdate: React.FC<typesProps> = ({ setValue, zapato }) => {
    console.log(zapato)

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center'>
            <div className="w-[80%] h-72 bg-white">
                <h1>{zapato.nombre}</h1>
                <button
                    onClick={() => setValue(null)}
                    className="flex w-full h-9 justify-center items-center btn btn-primary">
                    Prueba
                </button>
            </div>
        </div>

    )
}
