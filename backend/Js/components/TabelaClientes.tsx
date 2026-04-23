import { useClientes } from "../hooks/useClientes";
import { LinhaCliente } from "./LinhaCliente";

export default function TabelaClientes() {
  const { clientes, busca, setBusca, loading, erro, excluir, atualizar } =
    useClientes();

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <LinhaCliente
              key={cliente.id_cliente}
              cliente={cliente}
              onExcluir={excluir}
              onEditar={atualizar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}