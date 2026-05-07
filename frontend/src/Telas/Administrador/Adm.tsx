import { useState } from "react";
import TabelaClientes from "./TabelaClientePaginaAdministrador/TabelaClientes";
import HeaderPaginaAdministrador from "./HeaderPaginaAdministrador/Header";
import { HeaderTabelaClientePaginaAdm } from "./TabelaClientePaginaAdministrador/HeaderTabelaClientePaginaAdm";

export default function PaginaAdministrador() {
  const [termoPesquisa, setTermoPesquisa] = useState("");

  return (
    <>
      <HeaderPaginaAdministrador
        termoPesquisa={termoPesquisa}
        onPesquisar={setTermoPesquisa}
      />
      <HeaderTabelaClientePaginaAdm />
      <TabelaClientes termoPesquisa={termoPesquisa} />
    </>
  );
}
