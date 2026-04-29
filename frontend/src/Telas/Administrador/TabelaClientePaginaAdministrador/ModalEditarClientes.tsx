import { useState, useEffect } from "react";
import type { Cliente, ClienteUpdatePayload } from "../../../types/cliente";
import "./ModalEditarClientes.css";

interface Props {
  cliente: Cliente | null;
  onSalvar: (id: number, dados: ClienteUpdatePayload) => Promise<void>;
  onFechar: () => void;
}

export function ModalEditarCliente({ cliente, onSalvar, onFechar }: Props) {
  const [form, setForm] = useState<ClienteUpdatePayload>({
    nome_completo: "",
    documento: "",
    telefone: "",
    status_cliente: "PENDENTE",
  });

  useEffect(() => {
    if (cliente) setForm(cliente);
  }, [cliente]);

  if (!cliente) return null;

  async function handleSalvar() {
    await onSalvar(cliente!.id_cliente, form);
    onFechar();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="fechar" onClick={onFechar}>
          ×
        </span>

        <div className="client-form-container">
          <h2>Dados do Cliente</h2>

          <div className="client-form">
            <div className="form-group">
              <label>Nome</label>
              <input
                name="nome_completo"
                type="text"
                value={form.nome_completo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>CPF</label>
              <input
                name="documento"
                type="text"
                value={form.documento}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                name="telefone"
                type="text"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Valor Emprestado</label>
              <input name="valor" type="number" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Qtd. Parcelas</label>
              <input name="parcelas" type="text" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status_cliente"
                value={form.status_cliente}
                onChange={handleChange}
              >
                <option value="PENDENTE">Pendente</option>
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
              </select>
            </div>

            <div className="form-buttons">
              <button className="btn-save" onClick={handleSalvar}>
                Salvar
              </button>
              <button className="btn-cancel" onClick={onFechar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
