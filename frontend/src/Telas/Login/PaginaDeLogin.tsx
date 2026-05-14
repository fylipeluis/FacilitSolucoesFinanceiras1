import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaginaDeLogin.css";

type Perfil = "cliente" | "administrador";

export function PaginaDeLogin() {
  const [perfil, setPerfil] = useState<Perfil>("cliente");

  const navigate = useNavigate();

  const handleAcessar = () => {
    if (perfil === "administrador") {
      navigate("/administrador");
    } else {
      navigate("/cliente");
    }
  };

  return (
    <div className="login-page">
    <div className="box-pagina-de-login">
      <h1>Acessar plataforma</h1>
      <p>Selecione o tipo de acesso para continuar.</p>

      <div className="tab-group">
        <button
          className={perfil === "cliente" ? "tab active" : "tab"}
          onClick={() => setPerfil("cliente")}
        >
          Cliente
        </button>

        <button
          className={perfil === "administrador" ? "tab active" : "tab"}
          onClick={() => setPerfil("administrador")}
        >
          Administrador
        </button>
      </div>

      {perfil === "cliente" && (
        <div className="input-group">
          <label htmlFor="documento">CPF ou CNPJ</label>

          <input
            type="text"
            id="documento"
            placeholder="000.000.000-00 / 00.000.000/0000-00"
          />
        </div>
      )}

      {perfil === "administrador" && (
        <>
          <div className="input-group">
            <label htmlFor="documento">
              Documento (CPF/CNPJ)
            </label>

            <input
              type="text"
              id="documento"
              placeholder="000.000.000-00 / 00.000.000/0000-00"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>

            <input
              type="password"
              id="senha"
              placeholder="••••••••"
            />
          </div>
        </>
      )}

      <button
        className="btn-primary"
        onClick={handleAcessar}
      >
        Entrar como {perfil}
      </button>

      <div className="footer">
        Seus dados são protegidos 🔒
      </div>
    </div>
    </div>
  );
}