import type { Fatura } from "../types/fatura";

const BASE_URL = "http://localhost:8000/faturas" as const;

export async function fetchContratosPorCliente(
  idCliente: number
): Promise<Fatura[]> {
  const response = await fetch(`${BASE_URL}/cliente/${idCliente}`);

  if (!response.ok)
    throw new Error("Erro ao buscar contratos: " + response.statusText);

  return response.json();
}
