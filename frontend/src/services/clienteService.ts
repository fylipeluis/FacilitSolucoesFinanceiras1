import type { Cliente } from "../types/cliente";

export function filtrarClientes(clientes: Cliente[], termo: string): Cliente[] {
  const t = termo.toLowerCase();

  return clientes.filter(({ nome_completo, documento, telefone }) =>
      nome_completo.toLowerCase().includes(t) ||
      documento.toLowerCase().includes(t) ||
      telefone.toLowerCase().includes(t)
  );
}

export function getStatusClass(
  status: Cliente["status_cliente"]
): string {
  const map: Record<Cliente["status_cliente"], string> = {
    ATIVO:    "status-ativo",
    INATIVO:  "status-inativo",
    PENDENTE: "status-pendente",
  };

  return map[status];
}