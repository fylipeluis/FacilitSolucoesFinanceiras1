import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import PaginaAdministrador from "./Telas/Administrador/Adm";
import { PaginaDeLogin } from "./Telas/Login/PaginaDeLogin";
import { DetalhesCliente } from "./Telas/DetalhesCliente/DetalhesCliente";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<PaginaDeLogin />} />

        <Route path="/administrador" element={<PaginaAdministrador />} />

        <Route path="/cliente" element={<DetalhesCliente />} />
      </Routes>
    </BrowserRouter>
  );
}
