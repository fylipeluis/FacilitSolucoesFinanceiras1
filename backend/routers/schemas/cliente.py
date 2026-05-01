from pydantic import BaseModel
from typing import Literal

class ClienteUpdate(BaseModel):
    nome_completo: str
    documento: str
    telefone: str