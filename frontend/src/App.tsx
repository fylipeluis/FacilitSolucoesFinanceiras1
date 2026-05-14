import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import PaginaAdministrador from "./Telas/Administrador/Adm";
import { PaginaDeLogin } from "./Telas/Login/PaginaDeLogin";

// EXEMPLO TEMPORÁRIO DA PÁGINA CLIENTE
function PaginaCliente() {
  return <h1>Página do Cliente</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<PaginaDeLogin />} />

        <Route
          path="/administrador"
          element={<PaginaAdministrador />}
        />

        <Route
          path="/cliente"
          element={<PaginaCliente />}
        />
      </Routes>
    </BrowserRouter>
  );
}