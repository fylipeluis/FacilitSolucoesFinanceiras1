import { useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import { LinhaCliente } from "./LinhaCliente";
import { ModalEditarCliente } from "./ModalEditarClientes";
import type { Cliente } from "../../../types/cliente";
import "./TabelaClientes.css";

interface Props {
  termoPesquisa: string;
}

function filtrarClientes(clientes: Cliente[], termo: string): Cliente[] {
  if (!termo) return clientes;
  return clientes.filter((cliente) =>
    cliente.nome_completo.toLowerCase().includes(termo.toLowerCase()),
  );
}

export default function TabelaClientes({ termoPesquisa }: Props) {
  const { clientes, loading, erro, excluir, atualizar } = useClientes();
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const clientesFiltrados = filtrarClientes(clientes, termoPesquisa);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="table-container">
      <table>
        <tbody>
          {clientesFiltrados.map((cliente) => (
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
