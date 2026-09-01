import { useEffect, useState } from "react";
import type { Aviso } from "../types";
import { criarAviso, excluirAviso, listarAvisos } from "../api";
import BotaoVoltar from "./BotaoVoltar";

interface TelaAvisosProps {
  aoVoltar: () => void;
}

function TelaAvisos({ aoVoltar }: TelaAvisosProps) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [titulo, setTitulo] = useState("");
  const [mensagemTexto, setMensagemTexto] = useState("");
  const [data, setData] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarAvisos();
        setAvisos(dados);
      } catch {
        setErro("Não foi possível carregar os avisos.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function limparCampos() {
    setTitulo("");
    setMensagemTexto("");
    setData("");
  }

  async function aoEnviar(evento: React.FormEvent) {
    evento.preventDefault();
    setMensagemErro("");

    if (titulo.trim() === "") {
      setMensagemErro("Informe o título do aviso.");
      return;
    }
    if (mensagemTexto.trim() === "") {
      setMensagemErro("Informe a mensagem do aviso.");
      return;
    }
    if (data.trim() === "") {
      setMensagemErro("Informe a data do aviso.");
      return;
    }

    try {
      const novoAviso = await criarAviso({ titulo, mensagem: mensagemTexto, data });
      setAvisos([novoAviso, ...avisos]);
      limparCampos();
    } catch (erroAviso) {
      setMensagemErro((erroAviso as Error).message);
    }
  }

  async function aoExcluir(id: number) {
    try {
      await excluirAviso(id);
      setAvisos(avisos.filter((aviso) => aviso.id !== id));
    } catch (erroExclusao) {
      setErro((erroExclusao as Error).message);
    }
  }

  return (
    <div className="tela-avisos">
      <BotaoVoltar aoVoltar={aoVoltar} />
      <h2>Mural de avisos</h2>

      <form className="form-aviso-inline" onSubmit={aoEnviar}>
        <div className="campo">
          <label htmlFor="titulo-aviso">Título</label>
          <input
            id="titulo-aviso"
            type="text"
            placeholder="Ex.: Prova de Python"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
          />
        </div>

        <div className="campo campo-carga">
          <label htmlFor="data-aviso">Data</label>
          <input
            id="data-aviso"
            type="text"
            placeholder="Ex.: 10/09/2026"
            value={data}
            onChange={(evento) => setData(evento.target.value)}
          />
        </div>

        <div className="campo campo-mensagem">
          <label htmlFor="mensagem-aviso">Mensagem</label>
          <textarea
            id="mensagem-aviso"
            placeholder="Detalhes do aviso..."
            value={mensagemTexto}
            onChange={(evento) => setMensagemTexto(evento.target.value)}
          ></textarea>
        </div>

        {mensagemErro !== "" && <p className="campo-erro">{mensagemErro}</p>}

        <button className="botao-primario" type="submit">
          Publicar aviso
        </button>
      </form>

      {carregando && <p className="mensagem-status">Carregando...</p>}
      {!carregando && erro !== "" && <p className="mensagem-erro">{erro}</p>}
      {!carregando && erro === "" && (
        <>
          {avisos.length === 0 && <p className="mensagem-vazia">Nenhum aviso publicado ainda.</p>}
          {avisos.length > 0 && (
            <div className="grade-avisos">
              {avisos.map((aviso) => (
                <article key={aviso.id} className="card-aviso">
                  <div className="card-aviso-topo">
                    <div className="card-aviso-icone">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"></path><path d="M8 6v8"></path></svg>
                    </div>
                    <div className="card-aviso-info">
                      <h3>{aviso.titulo}</h3>
                      <span className="card-aviso-data">{aviso.data}</span>
                    </div>
                    <button
                      className="botao-excluir"
                      type="button"
                      aria-label={`Excluir aviso ${aviso.titulo}`}
                      onClick={() => aoExcluir(aviso.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                  <p className="card-aviso-mensagem">{aviso.mensagem}</p>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TelaAvisos;
