import "./Header.css";
import { LogoHeaderPaginaAdm } from "./HeaderComponents/LogoHeaderPaginaAdm";
import { TituloHeaderPaginaAdm } from "./HeaderComponents/TituloHeaderPaginaAdm";


export default function HeaderPaginaAdministrador(){
  return (
    <div className="header">
      <TituloHeaderPaginaAdm />
      <LogoHeaderPaginaAdm />
    </div>
  );
}
