import type { Aluno } from "../types";

interface AlunoCardProps {
  aluno: Aluno;
  aoExcluir: (id: number) => void;
}

function AlunoCard({ aluno, aoExcluir }: AlunoCardProps) {
  const aprovado = aluno.media >= 6;
  const classeSelo = aprovado ? "selo selo-aprovado" : "selo selo-reprovado";
  const textoSelo = aprovado ? "Aprovado" : "Reprovado";

  return (
    <article className="card-aluno">
      <div className="card-topo">
        <h3>{aluno.nome}</h3>
        <span className={classeSelo}>{textoSelo}</span>
      </div>
      <dl className="card-dados">
        <div>
          <dt>Matrícula</dt>
          <dd>{aluno.matricula}</dd>
        </div>
        <div>
          <dt>Idade</dt>
          <dd>{aluno.idade} anos</dd>
        </div>
      </dl>
      <div className="card-rodape">
        <div className="media-bloco">
          <span className="media-valor">{aluno.media}</span>
          <span className="media-rotulo">média</span>
        </div>
        <button
          className="botao-excluir"
          type="button"
          aria-label={`Excluir ${aluno.nome}`}
          onClick={() => aoExcluir(aluno.id)}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default AlunoCard;
