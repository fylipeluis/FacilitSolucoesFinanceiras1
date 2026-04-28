import { useClientes } from "../../../hooks/useClientes";
import { LinhaCliente } from "./LinhaCliente";

export default function TabelaClientes() {
  const { clientes, busca, setBusca, loading, erro, excluir, atualizar } =
    useClientes();

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
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
