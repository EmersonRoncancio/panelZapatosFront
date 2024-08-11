import { useEffect, useState } from "react"
import { useZapatos } from "../../context/zapatos"
import { SkeletonZapatos, valorInicialState } from "./helpers/helpers"
import { axiosGet } from "../../helpers/peticiones/get"
import { envs } from "../../configs/envs"
import { GetPagination } from "../../customsHooks/GetPagination"
import { Card } from "./components/Card"
import { FormUpdate } from "./components/FormUpdate"
import { Zapato } from "../../context/helpers/types"
import { AlertError, AlertSucces } from "../../alerts/alerts"
import { ToastContainer } from "react-toastify"

export const UpdateDelete = () => {

    const [zapato, setZapato] = useState<Zapato>(valorInicialState)
    const [modal, setModal] = useState<string | null>(null)
    const { getzapatos, setZapatos } = useZapatos()
    const [pagination, setPagination] = useState<number>(1)

    const { data, isLoading } = GetPagination({
        querykey: ['zapatos', pagination],
        queryfn: async () => await axiosGet({ url: `${envs.API}/zapatos/?page=${pagination}` })
    })

    useEffect(() => {
        if (!isLoading) setZapatos(data?.Zapatos)
    }, [data, setZapatos, isLoading])

    return (
        <div className="relative">
            <nav className="p-2">
                <div className="navbar bg-slate-200 rounded-md">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">daisyUI</a>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="w-full flex flex-col justify-center items-center my-2 ">
                <div className="useGrid">
                    {
                        isLoading ?
                            SkeletonZapatos.map((number) => {
                                return (
                                    <div key={number} className="flex w-52 flex-col gap-4">
                                        <div className="skeleton h-32 w-full"></div>
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                )
                            }) :
                            getzapatos.map((zapato) => {
                                return (
                                    <Card key={zapato.id} zapato={zapato} setZapato={setZapato} alert={AlertSucces} setModal={setModal} />
                                )
                            })
                    }
                </div>
                <div className="join my-7">
                    <button className="join-item btn"
                        onClick={() => {
                            setPagination(prevOld => Math.max(prevOld - 1, 1))
                        }} disabled={pagination === 1}>«</button>
                    <div className="join-item btn">Page {pagination}</div>
                    <button className="join-item btn"
                        onClick={() => {
                            setPagination(prevOld => prevOld + 1)
                        }} disabled={!data?.nextPage} >»</button>
                </div>
                {
                    modal !== null && <FormUpdate setModal={setModal} zapato={zapato} alertError={AlertError} alertSucces={AlertSucces} />
                }
                <ToastContainer
                    className='z-30'
                    position="top-center" />
            </main>
        </div>
    )
}
