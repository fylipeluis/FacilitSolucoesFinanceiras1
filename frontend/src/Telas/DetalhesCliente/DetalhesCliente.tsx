import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Cliente } from "../../types/cliente";
import type { Fatura } from "../../types/fatura";
import { fetchClientes } from "../../api/clienteApi";
import { fetchContratosPorCliente } from "../../api/faturaApi";
import "./DetalhesCliente.css";

export function DetalhesCliente() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [showPagamentoModal, setShowPagamentoModal] = useState(false);
  const [parcelaAtual, setParcelaAtual] = useState<number | null>(null);

  useEffect(() => {
    const cpfSalvo = localStorage.getItem("cpfCliente");
    if (!cpfSalvo) {
      navigate("/login");
      return;
    }

    carregarDados(cpfSalvo);
  }, [navigate]);

  async function carregarDados(cpf: string) {
    try {
      setCarregando(true);
      setErro(null);

      // Buscar cliente pelo CPF
      const clientes = await fetchClientes();
      const clienteEncontrado = clientes.find((c) => c.documento === cpf);

      if (!clienteEncontrado) {
        setErro("Cliente não encontrado");
        return;
      }

      setCliente(clienteEncontrado);

      // Buscar faturas do cliente
      const faturasCliente = await fetchContratosPorCliente(
        clienteEncontrado.id_cliente,
      );
      setFaturas(faturasCliente);
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      setErro("Erro ao carregar os dados do cliente");
    } finally {
      setCarregando(false);
    }
  }

  function handleSair() {
    localStorage.removeItem("cpfCliente");
    navigate("/login");
  }

  function handlePagar(id_parcela: number) {
    setParcelaAtual(id_parcela);
    setShowPagamentoModal(true);
  }

  function getStatusClass(status?: string): string {
    const statusLower = (status || "").toUpperCase();
    if (statusLower === "PAGO") return "status-pago";
    if (statusLower === "ADIANTADO") return "status-adiantado";
    if (statusLower === "ATRASADO") return "status-atrasado";
    if (statusLower === "PENDENTE") return "status-pendente";
    return "status-pendente";
  }

  function getStatusTexto(status?: string): string {
    const statusLower = (status || "").toUpperCase();
    if (statusLower === "PAGO") return "Pago";
    if (statusLower === "ADIANTADO") return "Adiantado";
    if (statusLower === "ATRASADO") return "Atrasado";
    if (statusLower === "PENDENTE") return "Pendente";
    return "Pendente";
  }

  if (carregando) {
    return (
      <div className="cliente-page">
        <div className="cliente-header">
          <h1>Carregando...</h1>
          <button className="btn-sair" onClick={handleSair}>
            Sair
          </button>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="cliente-page">
        <div className="cliente-header">
          <h1>Erro</h1>
          <button className="btn-sair" onClick={handleSair}>
            Sair
          </button>
        </div>
        <div className="cliente-container">
          <p className="erro-mensagem">{erro}</p>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="cliente-page">
        <div className="cliente-header">
          <h1>Dados do Cliente</h1>
          <button className="btn-sair" onClick={handleSair}>
            Sair
          </button>
        </div>
        <div className="cliente-container">
          <p>Nenhum cliente encontrado</p>
        </div>
      </div>
    );
  }

  const totalParcelas = faturas.reduce((acc, f) => acc + f.parcelas.length, 0);
  const parcelasPagas = faturas.reduce(
    (acc, f) =>
      acc +
      f.parcelas.filter(
        (p) => (p.status_cobranca || "").toUpperCase() === "PAGO",
      ).length,
    0,
  );

  return (
    <div className="cliente-page">
      <div className="cliente-header">
        <div className="header-content">
          <h1>Bem-vindo, {cliente.nome_completo}</h1>
          <p className="header-desc">
            Gerencie suas parcelas e visualize seus dados
          </p>
        </div>
        <button className="btn-sair" onClick={handleSair}>
          Sair
        </button>
      </div>

      <div className="cliente-container">
        {/* Seção de Dados do Cliente */}
        <section className="dados-cliente-section">
          <div className="section-header">
            <h2>Meus Dados</h2>
            <p className="section-desc">
              Informações de cadastro (apenas visualização)
            </p>
          </div>

          <div className="dados-grid">
            <div className="dado-item">
              <label>Nome Completo</label>
              <div className="dado-valor">{cliente.nome_completo}</div>
            </div>

            <div className="dado-item">
              <label>CPF</label>
              <div className="dado-valor">{cliente.documento}</div>
            </div>

            <div className="dado-item">
              <label>Telefone</label>
              <div className="dado-valor">{cliente.telefone}</div>
            </div>

            <div className="dado-item">
              <label>Status</label>
              <div
                className={`dado-valor status ${getStatusClass(cliente.status_cliente)}`}
              >
                {cliente.status_cliente}
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Resumo */}
        <section className="resumo-section">
          <div className="resumo-cards">
            <div className="resumo-card">
              <div className="resumo-label">Total de Parcelas</div>
              <div className="resumo-valor">{totalParcelas}</div>
            </div>

            <div className="resumo-card">
              <div className="resumo-label">Parcelas Pagas</div>
              <div className="resumo-valor" style={{ color: "#10b981" }}>
                {parcelasPagas}
              </div>
            </div>

            <div className="resumo-card">
              <div className="resumo-label">Pendentes</div>
              <div className="resumo-valor" style={{ color: "#f59e0b" }}>
                {totalParcelas - parcelasPagas}
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Parcelas */}
        <section className="parcelas-section">
          <div className="section-header">
            <h2>Minhas Parcelas</h2>
            <p className="section-desc">Acompanhe o status de cada parcela</p>
          </div>

          {faturas.length === 0 ? (
            <div className="sem-parcelas">
              <p>
                Você ainda não possui parcelas. Quando forem cadastradas
                aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="parcelas-container">
              {faturas.map((fatura) => (
                <div key={fatura.id_fatura} className="fatura-bloco">
                  <div className="fatura-header">
                    <h3>Contrato #{fatura.id_fatura}</h3>
                    <p className="fatura-info">
                      Valor:{" "}
                      <strong>R$ {fatura.valor_emprestimo.toFixed(2)}</strong> |
                      Parcelas: <strong>{fatura.qtd_parcelas}x</strong>
                    </p>
                  </div>

                  <div className="tabela-parcelas">
                    <table>
                      <thead>
                        <tr>
                          <th>Parcela</th>
                          <th>Valor</th>
                          <th>Status</th>
                          <th>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fatura.parcelas.map((parcela) => (
                          <tr key={parcela.id_cobranca}>
                            <td className="parcela-numero">
                              #{parcela.numero_parcela}
                            </td>
                            <td className="parcela-valor">
                              R$ {parcela.valor_cobranca.toFixed(2)}
                            </td>
                            <td>
                              <span
                                className={`status-badge ${getStatusClass(parcela.status_cobranca)}`}
                              >
                                {getStatusTexto(parcela.status_cobranca)}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn-pagar"
                                onClick={() => handlePagar(parcela.id_cobranca)}
                                disabled={
                                  (
                                    parcela.status_cobranca || ""
                                  ).toUpperCase() === "PAGO"
                                }
                              >
                                {(
                                  parcela.status_cobranca || ""
                                ).toUpperCase() === "PAGO"
                                  ? "Pago"
                                  : "Pagar"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal de Pagamento */}
      {showPagamentoModal && (
        <ModalPagamento
          parcelaId={parcelaAtual}
          valor={
            faturas
              .flatMap((f) => f.parcelas)
              .find((p) => p.id_cobranca === parcelaAtual)?.valor_cobranca || 0
          }
          onFechar={() => {
            setShowPagamentoModal(false);
            setParcelaAtual(null);
          }}
        />
      )}
    </div>
  );
}

interface ModalPagamentoProps {
  parcelaId: number | null;
  valor: number;
  onFechar: () => void;
}

function ModalPagamento({ parcelaId, valor, onFechar }: ModalPagamentoProps) {
  const [metodoPagamento, setMetodoPagamento] = useState<
    "pix" | "boleto" | "credito"
  >("pix");

  function handlePagarAgora() {
    alert(
      `Pagamento de R$ ${valor.toFixed(2)} via ${metodoPagamento.toUpperCase()} será processado em breve.`,
    );
    onFechar();
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-pagamento" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={onFechar}>
          ×
        </button>

        <h2>Confirmar Pagamento</h2>
        <p className="modal-desc">Parcela #{parcelaId}</p>

        <div className="valor-display">
          <span className="valor-label">Valor a Pagar:</span>
          <span className="valor-grande">R$ {valor.toFixed(2)}</span>
        </div>

        <div className="metodos-pagamento">
          <label className="metodo-item">
            <input
              type="radio"
              name="metodo"
              value="pix"
              checked={metodoPagamento === "pix"}
              onChange={(e) => setMetodoPagamento(e.target.value as "pix")}
            />
            <span className="metodo-label">
              <strong>PIX</strong>
              <small>Instantâneo e seguro</small>
            </span>
          </label>

          <label className="metodo-item">
            <input
              type="radio"
              name="metodo"
              value="boleto"
              checked={metodoPagamento === "boleto"}
              onChange={(e) => setMetodoPagamento(e.target.value as "boleto")}
            />
            <span className="metodo-label">
              <strong>Boleto</strong>
              <small>Prazo de até 2 dias</small>
            </span>
          </label>

          <label className="metodo-item">
            <input
              type="radio"
              name="metodo"
              value="credito"
              checked={metodoPagamento === "credito"}
              onChange={(e) => setMetodoPagamento(e.target.value as "credito")}
            />
            <span className="metodo-label">
              <strong>Cartão de Crédito</strong>
              <small>Em até 12 parcelas</small>
            </span>
          </label>
        </div>

        <div className="modal-buttons">
          <button className="btn-pagar-agora" onClick={handlePagarAgora}>
            Pagar Agora
          </button>
          <button className="btn-cancelar-modal" onClick={onFechar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
