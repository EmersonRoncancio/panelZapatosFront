import { Link, Route, Routes } from "react-router-dom"
import { Agregar } from "./Agregar"
import { Inicio } from "./Inicio"

export const Home = () => {
  return (
    <div className="flex w-full">
      <aside className="w-[20%] bg-[#4c9da1] h-screen sticky flex justify-center py-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white font-semibold text-lg">ZAPATOIDE</h2>
          <ul className="flex flex-col justify-start items-center gap-7">
            <li className="btn btn-wide btn-primary"><Link to='/home/inicio'>Inicio</Link></li>
            <li className="btn btn-wide btn-primary"><Link to='/home/agregar'>Agregar</Link></li>
          </ul>
        </div>
      </aside>
      <main className="w-[80%] h-screen overflow-auto">
        <Routes>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/agregar" element={<Agregar/>}/>
        </Routes>
      </main>
    </div>
  )
}
