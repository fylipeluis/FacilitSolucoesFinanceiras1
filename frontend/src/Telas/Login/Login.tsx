import BoxDeLoginPaginaLogin from "./BoxDeLoginPaginaLogin/BoxDeLoginPaginaLogin";
import { HeaderPaginaDeLogin } from "./HeaderDePaginaLogin/HeaderPaginaDeLogin";
import "./Login.css";

export function PaginaDeLogin() {
  return (
    <div className="login">
      <HeaderPaginaDeLogin />
      <BoxDeLoginPaginaLogin/>
    </div>
  );
}