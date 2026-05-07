import "./CaixaDePesquisaHeaderPaginaAdm.css";

interface Props {
  valor: string;
  onChange: (termo: string) => void;
}

export default function CaixaDePesquisaHeaderPaginaAdm({ valor, onChange }: Props) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pesquisar..."
        className="search-input"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search-button">
        🔍
      </button>
    </div>
  );
}