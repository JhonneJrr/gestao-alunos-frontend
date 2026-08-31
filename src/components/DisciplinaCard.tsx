import type { Disciplina } from "../types";

interface DisciplinaCardProps {
  disciplina: Disciplina;
}

function DisciplinaCard({ disciplina }: DisciplinaCardProps) {
  return (
    <article className="card-disciplina">
      <h3>{disciplina.nome}</h3>
      <p>{disciplina.carga_horaria} h</p>
    </article>
  );
}

export default DisciplinaCard;
