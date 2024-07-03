import { Route, Routes } from "react-router-dom";
import { Register } from "./routesAuth/Register";
import { ForgotPassword } from "./routesAuth/ForgotPassword";
import { Login } from "./routesAuth/Login";
import { ProtectedAuth } from "./routesAuth/ProtectedAuth";
import { Prueba } from "./routesAuth/Prueba";

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedAuth />}>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/prueba" element={<Prueba/>}/>
      </Route>
    </Routes>
  )
}