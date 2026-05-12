import { useState, useEffect } from "react";
import type { Fatura } from "../../../types/fatura";
import { fetchContratosPorCliente } from "../../../api/faturaApi";
import "./ModalContratos.css";

interface Props {
  clienteId: number | null;
  onFechar: () => void;
}

export function ModalContratos({ clienteId, onFechar }: Props) {
  const [contratos, setContratos] = useState<Fatura[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (clienteId) {
      console.log("Carregando contratos para cliente:", clienteId);
      carregarContratos();
    }
  }, [clienteId]);

  async function carregarContratos() {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await fetchContratosPorCliente(clienteId!);
      console.log("Contratos recebidos:", dados);
      setContratos(dados);
    } catch (err) {
      console.error("Erro ao buscar contratos:", err);
      setErro("Erro ao carregar contratos");
    } finally {
      setCarregando(false);
    }
  }

  function ordenarParcelas(parcelas: typeof contratos[0]["parcelas"]) {
    return [...parcelas].sort((a, b) => {
      const statusA = a.status_cobranca || "Pendente";
      const statusB = b.status_cobranca || "Pendente";

      // Pendente vem primeiro
      if (statusA === "Pendente" && statusB !== "Pendente") return -1;
      if (statusA !== "Pendente" && statusB === "Pendente") return 1;

      // Se ambos têm o mesmo status, ordena pelo número da parcela
      return a.numero_parcela - b.numero_parcela;
    });
  }

  if (!clienteId) return null;

  return (
    <div className="modal-contratos">
      <div className="modal-content-contratos">
        <div className="modal-header-contratos">
          <h2>Contratos e Parcelas</h2>
          <span className="fechar-contratos" onClick={onFechar}>
            ✕
          </span>
        </div>

        {carregando && <p className="carregando">Carregando contratos...</p>}

        {erro && <p className="erro">{erro}</p>}

        {!carregando && contratos.length === 0 && (
          <p className="sem-contratos">
            Nenhum contrato encontrado para este cliente.
          </p>
        )}

        {!carregando &&
          contratos.map((contrato) => (
            <div key={contrato.id_fatura} className="contrato-card">
              <div className="contrato-header">
                <h3>Contrato #{contrato.id_fatura}</h3>
                <div className="contrato-info">
                  <span>
                    <strong>Valor Total:</strong> R${" "}
                    {contrato.valor_emprestimo.toFixed(2)}
                  </span>
                  <span>
                    <strong>Parcelas:</strong> {contrato.qtd_parcelas}
                  </span>
                  <span>
                    <strong>Início:</strong>{" "}
                    {new Date(contrato.inicio_cobranca).toLocaleDateString(
                      "pt-BR",
                    )}
                  </span>
                </div>
              </div>

              <div className="parcelas-container">
                <table className="tabela-parcelas">
                  <thead>
                    <tr>
                      <th>Parcela</th>
                      <th>Valor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenarParcelas(contrato.parcelas).map((parcela) => (
                      <tr key={parcela.id_cobranca}>
                        <td>#{parcela.numero_parcela}</td>
                        <td>R$ {parcela.valor_cobranca.toFixed(2)}</td>
                        <td>
                          <span
                            className={`status-parcela ${
                              parcela.status_cobranca?.toLowerCase() ||
                              "pendente"
                            }`}
                          >
                            {parcela.status_cobranca || "Pendente"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
