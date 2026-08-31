import { useEffect, useState } from "react";
import type { Aluno, Disciplina } from "../types";
import { disciplinasDoAluno, listarAlunos, listarDisciplinas, matricular } from "../api";
import BotaoVoltar from "./BotaoVoltar";

interface TelaMatriculasProps {
  aoVoltar: () => void;
}

function TelaMatriculas({ aoVoltar }: TelaMatriculasProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [alunoId, setAlunoId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [disciplinasDoAlunoLista, setDisciplinasDoAlunoLista] = useState<Disciplina[]>([]);
  const [carregandoVinculos, setCarregandoVinculos] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  async function carregarVinculos(idAluno: string) {
    if (idAluno === "") {
      setDisciplinasDoAlunoLista([]);
      return;
    }

    setCarregandoVinculos(true);
    try {
      const dados = await disciplinasDoAluno(Number(idAluno));
      setDisciplinasDoAlunoLista(dados);
    } catch {
      setDisciplinasDoAlunoLista([]);
    } finally {
      setCarregandoVinculos(false);
    }
  }

  useEffect(() => {
    async function carregar() {
      try {
        const alunosCarregados = await listarAlunos();
        const disciplinasCarregadas = await listarDisciplinas();
        setAlunos(alunosCarregados);
        setDisciplinas(disciplinasCarregadas);
      } catch {
        setErro("Não foi possível carregar os dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  useEffect(() => {
    carregarVinculos(alunoId);
  }, [alunoId]);

  function aoMudarAluno(novoAlunoId: string) {
    setAlunoId(novoAlunoId);
    setMensagem("");
    setMensagemErro("");
  }

  async function aoMatricular(evento: React.FormEvent) {
    evento.preventDefault();
    setMensagem("");
    setMensagemErro("");

    if (alunoId === "" || disciplinaId === "") {
      setMensagemErro("Selecione o aluno e a disciplina.");
      return;
    }

    try {
      await matricular(Number(alunoId), Number(disciplinaId));
      setMensagem("Aluno matriculado com sucesso.");
      setDisciplinaId("");
      await carregarVinculos(alunoId);
    } catch (erroMatricula) {
      setMensagemErro((erroMatricula as Error).message);
    }
  }

  if (carregando) {
    return (
      <div className="tela-matriculas">
        <BotaoVoltar aoVoltar={aoVoltar} />
        <p className="mensagem-status">Carregando...</p>
      </div>
    );
  }

  if (erro !== "") {
    return (
      <div className="tela-matriculas">
        <BotaoVoltar aoVoltar={aoVoltar} />
        <p className="mensagem-erro">{erro}</p>
      </div>
    );
  }

  return (
    <div className="tela-matriculas">
      <BotaoVoltar aoVoltar={aoVoltar} />

      <div className="campo">
        <label htmlFor="select-aluno">Aluno</label>
        <select id="select-aluno" value={alunoId} onChange={(evento) => aoMudarAluno(evento.target.value)}>
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </select>
      </div>

      {alunoId !== "" && (
        <>
          <form className="form-matricula" onSubmit={aoMatricular}>
            <div className="campo">
              <label htmlFor="select-disciplina">Disciplina</label>
              <select
                id="select-disciplina"
                value={disciplinaId}
                onChange={(evento) => setDisciplinaId(evento.target.value)}
              >
                <option value="">Selecione uma disciplina</option>
                {disciplinas.map((disciplina) => (
                  <option key={disciplina.id} value={disciplina.id}>
                    {disciplina.nome}
                  </option>
                ))}
              </select>
            </div>

            {mensagemErro !== "" && <p className="campo-erro">{mensagemErro}</p>}
            {mensagem !== "" && <p className="mensagem-sucesso">{mensagem}</p>}

            <button className="botao-primario" type="submit">
              Matricular
            </button>
          </form>

          <div className="lista-vinculos">
            {carregandoVinculos && <p className="mensagem-status">Carregando...</p>}
            {!carregandoVinculos && disciplinasDoAlunoLista.length === 0 && (
              <p className="mensagem-vazia">Este aluno ainda não tem disciplinas.</p>
            )}
            {!carregandoVinculos && disciplinasDoAlunoLista.length > 0 && (
              <ul className="grade-disciplinas">
                {disciplinasDoAlunoLista.map((disciplina) => (
                  <li key={disciplina.id} className="card-disciplina">
                    <h3>{disciplina.nome}</h3>
                    <p>{disciplina.carga_horaria} h</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {disciplinas.length === 0 && <p className="mensagem-vazia">Nenhuma disciplina cadastrada ainda.</p>}
    </div>
  );
}

export default TelaMatriculas;
