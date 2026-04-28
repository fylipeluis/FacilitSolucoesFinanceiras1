export interface Cliente {
  id_cliente: number;
  nome_completo: string;
  documento: string;
  telefone: string;
  status_cliente: "ATIVO" | "INATIVO" | "PENDENTE";
}

export type ClienteUpdatePayload = Omit<Cliente, "id_cliente">;