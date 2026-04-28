import { useState } from "react";
import { getStatusClass } from "../../../services/clienteService";
import type { Cliente, ClienteUpdatePayload } from "../../../types/cliente";

interface Props {
  cliente: Cliente;
  onExcluir: (id: number) => Promise<void>;
  onEditar: (id: number, dados: ClienteUpdatePayload) => void;
}

export function LinhaCliente({ cliente, onExcluir, onEditar }: Props) {
  const [confirmando, setConfirmando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  async function handleExcluir() {
    try {
      setExcluindo(true);
      await onExcluir(cliente.id_cliente);
    } catch {
      alert("Erro ao excluir cliente");
    } finally {
      setExcluindo(false);
      setConfirmando(false);
    }
  }

  return (
    <tr>
      <td>{cliente.nome_completo}</td>
      <td>{cliente.documento}</td>
      <td>{cliente.telefone}</td>

      <td>
        <span className={getStatusClass(cliente.status_cliente)}>
          {cliente.status_cliente}
        </span>
      </td>

      <td>
        {confirmando ? (
          <>
            <span>Confirmar?</span>
            <button onClick={handleExcluir} disabled={excluindo}>
              {excluindo ? "Excluindo..." : "Sim"}
            </button>
            <button onClick={() => setConfirmando(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => onEditar(cliente.id_cliente, cliente)}>
              Editar
            </button>
            <button onClick={() => setConfirmando(true)}>Excluir</button>
          </>
        )}
      </td>
    </tr>
  );
}