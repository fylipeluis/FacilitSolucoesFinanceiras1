import logo from "../../../assets/logoFacilit.png";
import "./HeaderPaginaDeLogin.css";

export function HeaderPaginaDeLogin() {
  return (
    <section className="header">
      <div className="logo-header">
        <img src={logo} alt="Logo da Empresa" className="logo" />
      </div>
    </section>
  );
}
