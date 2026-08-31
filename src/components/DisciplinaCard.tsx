import type { Disciplina } from "../types";

interface DisciplinaCardProps {
  disciplina: Disciplina;
  aoExcluir: (id: number) => void;
}

function DisciplinaCard({ disciplina, aoExcluir }: DisciplinaCardProps) {
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
      <button
        className="botao-excluir"
        type="button"
        aria-label={`Excluir ${disciplina.nome}`}
        onClick={() => aoExcluir(disciplina.id)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
          <path d="M3 6h18"></path>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </article>
  );
}

export default DisciplinaCard;
