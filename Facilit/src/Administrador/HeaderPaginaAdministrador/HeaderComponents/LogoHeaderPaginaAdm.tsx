import "./LogoHeaderPaginaAdm.css"
import logo from "../../../assets/Made with insMind-.png"

export function LogoHeaderPaginaAdm(){
    return(
    <div className="logo-title">
      <img src={logo} alt="Logo da Empresa" className="logo" />
    </div>
  );
}
