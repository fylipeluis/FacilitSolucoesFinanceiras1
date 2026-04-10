import "./Header.css";
import CaixaDePesquisaHeaderPaginaAdm from "./HeaderComponents/CaixaDePesquisaHeaderPaginaAdm"
import { LogoHeaderPaginaAdm } from "./HeaderComponents/LogoHeaderPaginaAdm"
import { TituloHeaderPaginaAdm } from "./HeaderComponents/TituloHeaderPaginaAdm"

export default function HeaderPaginaAdministrador(){
    return (
        <div className="header">
            <TituloHeaderPaginaAdm />
            <LogoHeaderPaginaAdm />
            <CaixaDePesquisaHeaderPaginaAdm />
        </div>
    )
}