import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PaginaAdministrador from "./Telas/Administrador/Adm"
import { PaginaDeLogin } from "./Telas/Login/login";
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<PaginaDeLogin/>} /> 
    <Route path="/Adm" element={<PaginaAdministrador />}/>
    </Routes>
  </BrowserRouter>
  )
}