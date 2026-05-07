from pydantic import BaseModel


class FaturaCreate(BaseModel):
    id_cliente: int
    valor_emprestimo: float
    qtd_parcelas: int
    inicio_cobranca: str

    class Config:
        from_attributes = True
