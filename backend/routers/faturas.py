from fastapi import APIRouter, HTTPException
from mysql.connector import Error
from backend.database.connection import conectar
from backend.schemas.fatura import FaturaCreate

router = APIRouter(prefix="/faturas", tags=["faturas"])

@router.post("/")
def criar_fatura(dados: FaturaCreate):
    connection = None
    cursor = None
    try:
        connection = conectar()
        cursor = connection.cursor()

        # Cria a fatura
        cursor.execute(
            """
            INSERT INTO adm_faturas (id_cliente, valor_emprestimo, qtd_parcelas, inicio_cobranca)
            VALUES (%s, %s, %s, %s)
            """,
            (dados.id_cliente, dados.valor_emprestimo, dados.qtd_parcelas, dados.inicio_cobranca),
        )
        id_fatura = cursor.lastrowid

        # Gera as cobranças automaticamente
        valor_parcela = round(dados.valor_emprestimo / dados.qtd_parcelas, 2)
        for i in range(1, dados.qtd_parcelas + 1):
            cursor.execute(
                """
                INSERT INTO cobrancas (id_cliente, id_fatura, valor_cobranca, numero_parcela)
                VALUES (%s, %s, %s, %s)
                """,
                (dados.id_cliente, id_fatura, valor_parcela, i),
            )

        # Atualiza status do cliente para ATIVO
        cursor.execute(
            "UPDATE clientes SET status_cliente = 'ATIVO' WHERE id_cliente = %s",
            (dados.id_cliente,),
        )

        connection.commit()
        return {"status": "sucesso", "mensagem": "Fatura criada", "id_fatura": id_fatura}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()