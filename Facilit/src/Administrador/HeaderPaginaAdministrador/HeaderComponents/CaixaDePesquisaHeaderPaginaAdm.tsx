import "./CaixaDePesquisaHeaderPaginaAdm.css"

export default function CaixaDePesquisaHeaderPaginaAdm() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pesquisar..."
        className="search-input"
      />
      <button className="search-button">
        🔍
      </button>
    </div>
  );
}
