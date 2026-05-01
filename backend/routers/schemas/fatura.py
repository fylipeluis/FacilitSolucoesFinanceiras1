from pydantic import BaseModel
from datetime import date

class FaturaCreate(BaseModel):
    id_cliente: int
    valor_emprestimo: float
    qtd_parcelas: int
    inicio_cobranca: date