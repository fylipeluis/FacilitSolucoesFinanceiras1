import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaginaDeLogin.css";

type Perfil = "cliente" | "administrador";

export function PaginaDeLogin() {
  const [perfil, setPerfil] = useState<Perfil>("cliente");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleAcessar = () => {
    setErro("");

    if (!documento.trim()) {
      setErro("Por favor, preencha o documento");
      return;
    }

    if (perfil === "administrador") {
      if (!senha.trim()) {
        setErro("Por favor, preencha a senha");
        return;
      }
      navigate("/administrador");
    } else {
      // Cliente: salvar CPF em localStorage
      localStorage.setItem("cpfCliente", documento);
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
            onClick={() => {
              setPerfil("cliente");
              setSenha("");
              setErro("");
            }}
          >
            Cliente
          </button>

          <button
            className={perfil === "administrador" ? "tab active" : "tab"}
            onClick={() => {
              setPerfil("administrador");
              setSenha("");
              setErro("");
            }}
          >
            Administrador
          </button>
        </div>

        {erro && <div className="erro-mensagem">{erro}</div>}

        {perfil === "cliente" && (
          <div className="input-group">
            <label htmlFor="documento">CPF ou CNPJ</label>

            <input
              type="text"
              id="documento"
              placeholder="000.000.000-00 / 00.000.000/0000-00"
              value={documento}
              onChange={(e) => {
                setDocumento(e.target.value);
                setErro("");
              }}
            />
          </div>
        )}

        {perfil === "administrador" && (
          <>
            <div className="input-group">
              <label htmlFor="documento">Documento (CPF/CNPJ)</label>

              <input
                type="text"
                id="documento"
                placeholder="000.000.000-00 / 00.000.000/0000-00"
                value={documento}
                onChange={(e) => {
                  setDocumento(e.target.value);
                  setErro("");
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>

              <input
                type="password"
                id="senha"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErro("");
                }}
              />
            </div>
          </>
        )}

        <button className="btn-primary" onClick={handleAcessar}>
          Entrar como {perfil}
        </button>

        <div className="footer">Seus dados são protegidos 🔒</div>
      </div>
    </div>
  );
}
