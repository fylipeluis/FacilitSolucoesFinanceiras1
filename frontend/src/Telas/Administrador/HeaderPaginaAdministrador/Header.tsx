import "./Header.css";
import CaixaDePesquisaHeaderPaginaAdm from "./HeaderComponents/CaixaDePesquisaHeaderPaginaAdm";
import { LogoHeaderPaginaAdm } from "./HeaderComponents/LogoHeaderPaginaAdm";
import { TituloHeaderPaginaAdm } from "./HeaderComponents/TituloHeaderPaginaAdm";

interface Props {
  termoPesquisa: string;
  onPesquisar: (termo: string) => void;
}

export default function HeaderPaginaAdministrador({
  termoPesquisa,
  onPesquisar,
}: Props) {
  return (
    <div className="header">
      <TituloHeaderPaginaAdm />
      <LogoHeaderPaginaAdm />
      <CaixaDePesquisaHeaderPaginaAdm
        valor={termoPesquisa}
        onChange={onPesquisar}
      />
    </div>
  );
}
