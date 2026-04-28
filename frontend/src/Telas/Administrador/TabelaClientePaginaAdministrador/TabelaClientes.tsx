import { useClientes } from "../../../hooks/useClientes";
import { LinhaCliente } from "./LinhaCliente";
import "./TabelaClientes.css"

export default function TabelaClientes() {
  const { clientes, busca, setBusca, loading, erro, excluir, atualizar } =
    useClientes();

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="table-container">
      <table>
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
