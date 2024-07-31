import { useQuery } from "@tanstack/react-query"
import { axiosGet } from "../../helpers/peticiones/get"
import { envs } from "../../configs/envs"
import { useEffect } from "react"
import { useZapatos } from "../../context/zapatos"
import { ToastContainer } from "react-toastify"

export const Inicio = () => {

  const { getzapatos, setZapatos } = useZapatos()
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['zapatos'],
    queryFn: async () => await axiosGet({ url: `${envs.API}/zapatos/` }),

  })

  useEffect(() => {
    if (!isLoading) setZapatos(data.Zapatos)
  }, [data, getzapatos, setZapatos, isLoading])

  return (
    <div>
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
      <main className="w-full flex justify-center items-center my-2">
        <div className="useGrid">
          {
            isLoading ?
              <ToastContainer
                position="top-center" /> :
              getzapatos.map((zapato) => {
                return (
                  <div className="card bg-base-100 w-64 shadow-xl">
                    <figure>
                      <img
                        src={zapato.imagen[0]}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {zapato.nombre}
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <p>{zapato.marca} {zapato.nombre}</p>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">{zapato.marca}</div>
                        <div className="badge badge-outline">{zapato.precio}</div>
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </main>
    </div>
  )
}
