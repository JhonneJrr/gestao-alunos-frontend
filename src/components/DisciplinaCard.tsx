import type { Disciplina } from "../types";

interface DisciplinaCardProps {
  disciplina: Disciplina;
}

function DisciplinaCard({ disciplina }: DisciplinaCardProps) {
  return (
    <article className="card-disciplina">
      <div className="card-disciplina-icone">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v16"></path>
          <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"></path>
        </svg>
      </div>
      <div className="card-disciplina-info">
        <h3>{disciplina.nome}</h3>
        <div className="media-bloco">
          <span className="media-valor">{disciplina.carga_horaria}</span>
          <span className="media-rotulo">horas</span>
        </div>
      </div>
    </article>
  );
}

export default DisciplinaCard;
