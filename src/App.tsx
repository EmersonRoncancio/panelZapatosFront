import { Route, Routes } from "react-router-dom";
import { Register } from "./routes/routesAuth/Register";
import { ForgotPassword } from "./routes/routesAuth/ForgotPassword";
import { Login } from "./routes/routesAuth/Login";
import { ProtectedAuth } from "./routes/routesAuth/ProtectedAuth";
import { Home } from "./routes/routesPanel/Home";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route element={<ProtectedAuth />}>
        <Route path="/home/*" element={<Home />} />
      </Route>
    </Routes>
  )
}