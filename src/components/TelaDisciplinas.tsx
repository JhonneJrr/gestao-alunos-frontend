import { useEffect, useState } from "react";
import type { Disciplina, DisciplinaComContagem } from "../types";
import { excluirDisciplina, listarDisciplinasComContagem } from "../api";
import BotaoVoltar from "./BotaoVoltar";
import DisciplinaCard from "./DisciplinaCard";
import FormDisciplina from "./FormDisciplina";

interface TelaDisciplinasProps {
  aoVoltar: () => void;
}

function TelaDisciplinas({ aoVoltar }: TelaDisciplinasProps) {
  const [disciplinas, setDisciplinas] = useState<DisciplinaComContagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarDisciplinasComContagem();
        setDisciplinas(dados);
      } catch {
        setErro("Não foi possível carregar as disciplinas.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function aoCriarDisciplina(novaDisciplina: Disciplina) {
    setDisciplinas([...disciplinas, { ...novaDisciplina, totalAlunos: 0 }]);
  }

  async function aoExcluir(id: number) {
    try {
      await excluirDisciplina(id);
      setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== id));
    } catch (erroExclusao) {
      setErro((erroExclusao as Error).message);
    }
  }

  return (
    <div className="tela-disciplinas-conteudo">
      <section className="tela-disciplinas">
        <BotaoVoltar aoVoltar={aoVoltar} />

        <h2>Disciplinas</h2>

        {carregando && <p className="mensagem-status">Carregando...</p>}
        {!carregando && erro !== "" && <p className="mensagem-erro">{erro}</p>}
        {!carregando && erro === "" && (
          <>
            <p className="contagem">
              <strong>{disciplinas.length}</strong> disciplina(s) encontrada(s)
            </p>
            {disciplinas.length === 0 && (
              <p className="mensagem-vazia">Nenhuma disciplina cadastrada ainda.</p>
            )}
            {disciplinas.length > 0 && (
              <div className="grade-disciplinas">
                {disciplinas.map((disciplina) => (
                  <DisciplinaCard key={disciplina.id} disciplina={disciplina} aoExcluir={aoExcluir} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <FormDisciplina aoCriarDisciplina={aoCriarDisciplina} />
    </div>
  );
}

export default TelaDisciplinas;
