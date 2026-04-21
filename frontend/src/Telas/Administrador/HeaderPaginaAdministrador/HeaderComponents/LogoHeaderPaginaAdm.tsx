import "./LogoHeaderPaginaAdm.css";
import logo from "../../../../assets/logoFacilit.png";

export function LogoHeaderPaginaAdm(){
    return(
    <div className="logo-title">
      <img src = {logo} alt="Logo da Empresa" className="logo" />
    </div>
  );
}
