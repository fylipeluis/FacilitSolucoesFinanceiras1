import { useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import { LinhaCliente } from "./LinhaCliente";
import { ModalEditarCliente } from "./ModalEditarClientes";
import type { Cliente } from "../../../types/cliente";
import "./TabelaClientes.css";

export default function TabelaClientes() {
  const { clientes, loading, erro, excluir, atualizar } = useClientes();
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

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
              onEditar={() => setClienteEditando(cliente)}
            />
          ))}
        </tbody>
      </table>

      <ModalEditarCliente
        cliente={clienteEditando}
        onSalvar={atualizar}
        onFechar={() => setClienteEditando(null)}
      />
    </div>
  );
}