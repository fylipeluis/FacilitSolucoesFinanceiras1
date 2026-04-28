import { useState, useEffect, useCallback } from "react";
import { fetchClientes, putCliente, deleteCliente } from "../api/clienteApi";
import { filtrarClientes } from "../services/clienteService";
import type { Cliente, ClienteUpdatePayload } from "../types/cliente";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Carrega ao montar
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchClientes();
        setClientes(data);
      } catch (e) {
        setErro("Erro ao carregar clientes");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const excluir = useCallback(async (id: number) => {
    await deleteCliente(id);
    setClientes((prev) => prev.filter((c) => c.id_cliente !== id));
  }, []);

  const atualizar = useCallback(
    async (id: number, dados: ClienteUpdatePayload) => {
      await putCliente(id, dados);
      setClientes((prev) =>
        prev.map((c) => (c.id_cliente === id ? { ...c, ...dados } : c))
      );
    },
    []
  );

  return {
    clientes: filtrarClientes(clientes, busca),
    busca,
    setBusca,
    loading,
    erro,
    excluir,
    atualizar,
  };
}