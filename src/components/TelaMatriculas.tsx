import { useEffect, useState } from "react";
import type { Aluno, Disciplina } from "../types";
import { disciplinasDoAluno, listarAlunos, listarDisciplinas } from "../api";
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
  const [disciplinasDoAlunoLista, setDisciplinasDoAlunoLista] = useState<Disciplina[]>([]);
  const [carregandoVinculos, setCarregandoVinculos] = useState(false);

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
    async function carregarVinculos() {
      if (alunoId === "") {
        setDisciplinasDoAlunoLista([]);
        return;
      }

      setCarregandoVinculos(true);
      try {
        const dados = await disciplinasDoAluno(Number(alunoId));
        setDisciplinasDoAlunoLista(dados);
      } catch {
        setDisciplinasDoAlunoLista([]);
      } finally {
        setCarregandoVinculos(false);
      }
    }

    carregarVinculos();
  }, [alunoId]);

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
        <select id="select-aluno" value={alunoId} onChange={(evento) => setAlunoId(evento.target.value)}>
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </select>
      </div>

      {alunoId !== "" && (
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
      )}

      {disciplinas.length === 0 && <p className="mensagem-vazia">Nenhuma disciplina cadastrada ainda.</p>}
    </div>
  );
}

export default TelaMatriculas;
