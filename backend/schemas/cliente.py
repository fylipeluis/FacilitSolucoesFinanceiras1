from pydantic import BaseModel


class ClienteUpdate(BaseModel):
    nome_completo: str = None
    telefone: str = None
    documento: str = None
    status_cliente: str = None

    class Config:
        from_attributes = True
