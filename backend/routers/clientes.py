from fastapi import APIRouter, HTTPException, Request
from mysql.connector import Error
from backend.database.connection import conectar
from backend.schemas.cliente import ClienteUpdate

router = APIRouter(tags=["clientes"])

@router.post("/webhook-forms")
async def receber_dados_forms(request: Request):
    connection = None
    cursor = None
    try:
        dados = await request.json()
        connection = conectar()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO clientes (nome_completo, telefone, documento) VALUES (%s, %s, %s)",
            (dados.get("nome"), dados.get("telefone"), dados.get("documento")),
        )
        connection.commit()
        return {"status": "sucesso", "mensagem": "Cliente salvo no banco"}
    except Error as e:
        return {"status": "erro", "mensagem": str(e)}
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()


@router.get("/clientes")
def listar_clientes():
    connection = conectar()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    resultados = cursor.fetchall()
    cursor.close()
    connection.close()
    return resultados


@router.put("/clientes/{id}")
def atualizar_cliente(id: int, dados: ClienteUpdate):
    connection = None
    cursor = None
    try:
        connection = conectar()
        cursor = connection.cursor()
        cursor.execute(
            """
            UPDATE clientes
            SET nome_completo = %s,
                documento     = %s,
                telefone      = %s
            WHERE id_cliente = %s
            """,
            (dados.nome_completo, dados.documento, dados.telefone, id),
        )
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")

        return {"status": "sucesso", "mensagem": "Cliente atualizado"}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()


@router.delete("/clientes/{id}")
def excluir_cliente(id: int):
    connection = None
    cursor = None
    try:
        connection = conectar()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM clientes WHERE id_cliente = %s", (id,))
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")

        return {"status": "sucesso", "mensagem": "Cliente excluído"}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()