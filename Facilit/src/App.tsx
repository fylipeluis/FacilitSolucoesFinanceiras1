import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PaginaAdministrador from "./Administrador/Adm"
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} /> 
    <Route path="/login" element={<PaginaAdministrador />}/>
    </Routes>
  </BrowserRouter>
  )
}