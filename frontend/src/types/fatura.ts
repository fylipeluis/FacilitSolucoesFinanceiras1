export interface Cobranca {
  id_cobranca: number;
  numero_parcela: number;
  valor_cobranca: number;
  status_cobranca?: string;
}

export interface Fatura {
  id_fatura: number;
  id_cliente: number;
  valor_emprestimo: number;
  qtd_parcelas: number;
  inicio_cobranca: string;
  parcelas: Cobranca[];
}
