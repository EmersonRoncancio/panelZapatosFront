import { Route, Routes } from "react-router-dom";
import { Login } from "./routesAuth/Login";
import { Register } from "./routesAuth/Register";
import { ForgotPassword } from "./routesAuth/ForgotPassword";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
    </Routes>
  )
}