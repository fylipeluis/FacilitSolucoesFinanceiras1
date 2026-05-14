import HeaderPaginaAdministrador from "./HeaderPaginaAdministrador/Header";
import { HeaderTabelaClientePaginaAdm } from "./TabelaClientePaginaAdministrador/HeaderTabelaClientePaginaAdm";
import TabelaClientes from "./TabelaClientePaginaAdministrador/TabelaClientes";

export default function PaginaAdministrador() {
  return (
    <>
      <HeaderPaginaAdministrador />
      <TabelaClientes/>
    </>
  );
}
