import { useEffect, useState } from "react";
import type { Disciplina } from "../types";
import { listarDisciplinas } from "../api";
import BotaoVoltar from "./BotaoVoltar";
import DisciplinaCard from "./DisciplinaCard";

interface TelaDisciplinasProps {
  aoVoltar: () => void;
}

function TelaDisciplinas({ aoVoltar }: TelaDisciplinasProps) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarDisciplinas();
        setDisciplinas(dados);
      } catch {
        setErro("Não foi possível carregar as disciplinas.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <div className="tela-disciplinas">
      <BotaoVoltar aoVoltar={aoVoltar} />

      <h2>Disciplinas</h2>

      {carregando && <p className="mensagem-status">Carregando...</p>}
      {!carregando && erro !== "" && <p className="mensagem-erro">{erro}</p>}
      {!carregando && erro === "" && disciplinas.length === 0 && (
        <p className="mensagem-vazia">Nenhuma disciplina cadastrada ainda.</p>
      )}
      {!carregando && erro === "" && disciplinas.length > 0 && (
        <>
          <p className="contagem">
            <strong>{disciplinas.length}</strong> disciplina(s) encontrada(s)
          </p>
          <div className="grade-disciplinas">
            {disciplinas.map((disciplina) => (
              <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TelaDisciplinas;
