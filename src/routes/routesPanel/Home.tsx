import { Link, Route, Routes } from "react-router-dom"
import { Agregar } from "./Agregar"
import { Inicio } from "./Inicio"
import { UpdateDelete } from "./UpdateDelete"

export const Home = () => {
  return (
    <div className="flex w-full">
      <aside className="w-[20%] bg-[#4c9da1] h-screen sticky flex justify-center py-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white font-semibold text-lg">ZAPATOIDE</h2>
          <ul className="flex flex-col justify-start items-center gap-7">
            <li><Link to='/home/' className="btn btn-wide btn-primary">Inicio</Link></li>
            <li><Link to='/home/agregar' className="btn btn-wide btn-primary">Agregar</Link></li>
            <li><Link to='/home/updateDelete' className="btn btn-wide btn-primary">Actualizar y Eliminar</Link></li>
          </ul>
        </div>
      </aside>
      <main className="w-[80%] h-screen overflow-auto">
        <Routes>
          <Route path="/" element={<Inicio/>} index/>
          <Route path="/agregar" element={<Agregar/>}/>
          <Route  path="/updateDelete" element={<UpdateDelete/>}/>
        </Routes>
      </main>
    </div>
  )
}
