import type { Aluno } from "../types";
import AlunoCard from "./AlunoCard";

interface ListaAlunosProps {
  alunos: Aluno[];
}

function ListaAlunos({ alunos }: ListaAlunosProps) {
  if (alunos.length === 0) {
    return <p className="mensagem-vazia">Nenhum aluno cadastrado ainda.</p>;
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
