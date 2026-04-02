import "./Header.css"
import CaixaDePesquisaHeaderPaginaAdm from "./HeaderComponents/CaixaDePesquisaHeaderPaginaAdm"
import { TituloHeaderPaginaAdm } from "./HeaderComponents/TituloHeaderPaginaAdm"

export default function HeaderPaginaAdministrador(){
    return (
        <div className="header">
            <TituloHeaderPaginaAdm />
            <CaixaDePesquisaHeaderPaginaAdm />
        </div>
    )
}