import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Rapha1802#",  # geralmente vazio no localhost
        database="facilit",
        port=3306
    )