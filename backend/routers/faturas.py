from fastapi import APIRouter, HTTPException
from mysql.connector import Error
from backend.database.connection import conectar
from backend.schemas.fatura import FaturaCreate

router = APIRouter(prefix="/faturas", tags=["faturas"])

@router.get("/cliente/{id_cliente}")
def obter_contratos_cliente(id_cliente: int):
    """
    Retorna todas as faturas (contratos) e suas parcelas de um cliente
    """
    connection = None
    cursor = None
    try:
        connection = conectar()
        cursor = connection.cursor(dictionary=True)
        
        # Busca todas as faturas do cliente
        cursor.execute(
            """
            SELECT id_fatura, id_cliente, valor_emprestimo, qtd_parcelas, inicio_cobranca
            FROM adm_faturas
            WHERE id_cliente = %s
            ORDER BY id_fatura DESC
            """,
            (id_cliente,),
        )
        faturas = cursor.fetchall()
        
        # Para cada fatura, busca as cobranças (parcelas)
        result = []
        for fatura in faturas:
            cursor.execute(
                """
                SELECT id_cobranca, numero_parcela, valor_cobranca
                FROM cobrancas
                WHERE id_fatura = %s
                ORDER BY numero_parcela ASC
                """,
                (fatura["id_fatura"],),
            )
            parcelas = cursor.fetchall()
            
            # Adiciona status padrão se não existir
            for parcela in parcelas:
                if "status_cobranca" not in parcela:
                    parcela["status_cobranca"] = "Pendente"
            
            result.append({
                **fatura,
                "parcelas": parcelas
            })
        
        return result
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

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