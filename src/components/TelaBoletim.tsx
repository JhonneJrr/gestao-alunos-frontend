import { useEffect, useState } from "react";
import type { Aluno, Disciplina } from "../types";
import { disciplinasDoAluno, lancarNota, listarAlunos, notasDoAluno } from "../api";
import BotaoVoltar from "./BotaoVoltar";

interface TelaBoletimProps {
  aoVoltar: () => void;
}

function TelaBoletim({ aoVoltar }: TelaBoletimProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [alunoId, setAlunoId] = useState("");
  const [disciplinasMatriculadas, setDisciplinasMatriculadas] = useState<Disciplina[]>([]);
  const [notas, setNotas] = useState<(Disciplina & { nota: number })[]>([]);
  const [carregandoBoletim, setCarregandoBoletim] = useState(false);

  const [disciplinaId, setDisciplinaId] = useState("");
  const [valorNota, setValorNota] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  async function carregarBoletim(idAluno: string) {
    if (idAluno === "") {
      setDisciplinasMatriculadas([]);
      setNotas([]);
      return;
    }

    setCarregandoBoletim(true);
    try {
      const disciplinasCarregadas = await disciplinasDoAluno(Number(idAluno));
      const notasCarregadas = await notasDoAluno(Number(idAluno));
      setDisciplinasMatriculadas(disciplinasCarregadas);
      setNotas(notasCarregadas);
    } catch {
      setDisciplinasMatriculadas([]);
      setNotas([]);
    } finally {
      setCarregandoBoletim(false);
    }
  }

  useEffect(() => {
    async function carregar() {
      try {
        const alunosCarregados = await listarAlunos();
        setAlunos(alunosCarregados);
      } catch {
        setErro("Não foi possível carregar os dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  useEffect(() => {
    carregarBoletim(alunoId);
  }, [alunoId]);

  function aoMudarAluno(novoAlunoId: string) {
    setAlunoId(novoAlunoId);
    setDisciplinaId("");
    setValorNota("");
    setMensagem("");
    setMensagemErro("");
  }

  async function aoLancarNota(evento: React.FormEvent) {
    evento.preventDefault();
    setMensagem("");
    setMensagemErro("");

    const notaNumero = Number(valorNota);
    if (disciplinaId === "") {
      setMensagemErro("Selecione a disciplina.");
      return;
    }
    if (valorNota.trim() === "" || Number.isNaN(notaNumero) || notaNumero < 0 || notaNumero > 10) {
      setMensagemErro("Informe uma nota entre 0 e 10.");
      return;
    }

    try {
      await lancarNota(Number(alunoId), Number(disciplinaId), notaNumero);
      setMensagem("Nota lançada com sucesso.");
      setValorNota("");
      await carregarBoletim(alunoId);
    } catch (erroNota) {
      setMensagemErro((erroNota as Error).message);
    }
  }

  const alunoSelecionado = alunos.find((aluno) => aluno.id === Number(alunoId));

  return (
    <div className="tela-boletim">
      <BotaoVoltar aoVoltar={aoVoltar} />
      <h2>Boletim</h2>

      {carregando && <p className="mensagem-status">Carregando...</p>}
      {!carregando && erro !== "" && <p className="mensagem-erro">{erro}</p>}

      {!carregando && erro === "" && (
        <>
          <div className="selecao-aluno">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <select value={alunoId} onChange={(evento) => aoMudarAluno(evento.target.value)} aria-label="Selecione um aluno">
              <option value="">Selecione um aluno</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
          </div>

          {alunoId === "" && (
            <p className="mensagem-vazia">Selecione um aluno para ver e lançar notas.</p>
          )}

          {alunoId !== "" && alunoSelecionado && (
            <div className="painel-matricula">
              <div className="aluno-selecionado">
                <div className="aluno-selecionado-icone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                  <h3>{alunoSelecionado.nome}</h3>
                  <p>
                    Matrícula {alunoSelecionado.matricula} · Média {alunoSelecionado.media}
                  </p>
                </div>
              </div>

              {!carregandoBoletim && disciplinasMatriculadas.length === 0 && (
                <p className="mensagem-vazia">Este aluno ainda não está matriculado em nenhuma disciplina.</p>
              )}

              {!carregandoBoletim && disciplinasMatriculadas.length > 0 && (
                <form className="form-matricula-inline" onSubmit={aoLancarNota}>
                  <div className="campo">
                    <label htmlFor="select-disciplina-nota">Disciplina</label>
                    <select
                      id="select-disciplina-nota"
                      value={disciplinaId}
                      onChange={(evento) => setDisciplinaId(evento.target.value)}
                    >
                      <option value="">Selecione uma disciplina</option>
                      {disciplinasMatriculadas.map((disciplina) => (
                        <option key={disciplina.id} value={disciplina.id}>
                          {disciplina.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="campo campo-carga">
                    <label htmlFor="valor-nota">Nota</label>
                    <input
                      id="valor-nota"
                      type="number"
                      step="0.1"
                      placeholder="Ex.: 8.5"
                      value={valorNota}
                      onChange={(evento) => setValorNota(evento.target.value)}
                    />
                  </div>

                  <button className="botao-primario" type="submit">
                    Lançar nota
                  </button>

                  {mensagemErro !== "" && <p className="campo-erro">{mensagemErro}</p>}
                  {mensagem !== "" && <p className="mensagem-sucesso">{mensagem}</p>}
                </form>
              )}

              <div className="lista-vinculos">
                <p className="rotulo-secao">Notas lançadas</p>
                {carregandoBoletim && <p className="mensagem-status">Carregando...</p>}
                {!carregandoBoletim && notas.length === 0 && (
                  <p className="mensagem-vazia">Nenhuma nota lançada ainda.</p>
                )}
                {!carregandoBoletim && notas.length > 0 && (
                  <ul className="chips-disciplinas">
                    {notas.map((disciplina) => (
                      <li key={disciplina.id} className="chip-disciplina">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
                        {disciplina.nome}
                        <span className="chip-disciplina-horas">{disciplina.nota.toFixed(1)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TelaBoletim;
