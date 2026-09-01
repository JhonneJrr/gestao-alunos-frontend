import { useEffect, useState } from "react";
import type { Aluno } from "../types";
import { frequenciasDoAluno, listarAlunos, type DisciplinaComFrequencia } from "../api";
import BotaoVoltar from "./BotaoVoltar";

interface TelaFrequenciaProps {
  aoVoltar: () => void;
}

function TelaFrequencia({ aoVoltar }: TelaFrequenciaProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [alunoId, setAlunoId] = useState("");
  const [frequencias, setFrequencias] = useState<DisciplinaComFrequencia[]>([]);
  const [carregandoFrequencias, setCarregandoFrequencias] = useState(false);

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
    async function carregarFrequencias() {
      if (alunoId === "") {
        setFrequencias([]);
        return;
      }

      setCarregandoFrequencias(true);
      try {
        const dados = await frequenciasDoAluno(Number(alunoId));
        setFrequencias(dados);
      } catch {
        setFrequencias([]);
      } finally {
        setCarregandoFrequencias(false);
      }
    }

    carregarFrequencias();
  }, [alunoId]);

  const alunoSelecionado = alunos.find((aluno) => aluno.id === Number(alunoId));

  return (
    <div className="tela-frequencia">
      <BotaoVoltar aoVoltar={aoVoltar} />
      <h2>Frequência</h2>

      {carregando && <p className="mensagem-status">Carregando...</p>}
      {!carregando && erro !== "" && <p className="mensagem-erro">{erro}</p>}

      {!carregando && erro === "" && (
        <>
          <div className="selecao-aluno">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <select value={alunoId} onChange={(evento) => setAlunoId(evento.target.value)} aria-label="Selecione um aluno">
              <option value="">Selecione um aluno</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
          </div>

          {alunoId === "" && (
            <p className="mensagem-vazia">Selecione um aluno para ver a frequência dele.</p>
          )}

          {alunoId !== "" && alunoSelecionado && (
            <div className="painel-matricula">
              <div className="aluno-selecionado">
                <div className="aluno-selecionado-icone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                  <h3>{alunoSelecionado.nome}</h3>
                  <p>Matrícula {alunoSelecionado.matricula}</p>
                </div>
              </div>

              <div className="lista-vinculos">
                <p className="rotulo-secao">Frequência por disciplina</p>
                {carregandoFrequencias && <p className="mensagem-status">Carregando...</p>}
                {!carregandoFrequencias && frequencias.length === 0 && (
                  <p className="mensagem-vazia">Este aluno ainda não tem frequência registrada.</p>
                )}
                {!carregandoFrequencias && frequencias.length > 0 && (
                  <ul className="chips-disciplinas">
                    {frequencias.map((disciplina) => {
                      const risco = disciplina.percentual < 75;
                      const classeChip = risco ? "chip-disciplina chip-risco" : "chip-disciplina";
                      return (
                        <li key={disciplina.id} className={classeChip}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v3"></path><path d="M16 2v3"></path><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="m9 15 2 2 4-4"></path></svg>
                          {disciplina.nome}
                          <span className="chip-disciplina-horas">{disciplina.percentual}%</span>
                        </li>
                      );
                    })}
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

export default TelaFrequencia;
