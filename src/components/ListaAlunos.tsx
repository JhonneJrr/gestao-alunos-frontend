import type { Aluno } from "../types";
import AlunoCard from "./AlunoCard";

interface ListaAlunosProps {
  alunos: Aluno[];
  mensagemVazia: string;
}

function ListaAlunos({ alunos, mensagemVazia }: ListaAlunosProps) {
  if (alunos.length === 0) {
    return <p className="mensagem-vazia">{mensagemVazia}</p>;
  }

  return (
    <div className="grade-alunos">
      {alunos.map((aluno) => (
        <AlunoCard key={aluno.id} aluno={aluno} />
      ))}
    </div>
  );
}

export default ListaAlunos;
