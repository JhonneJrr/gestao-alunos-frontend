import type { Aluno, Disciplina } from "../types";

interface ResumoAlunoProps {
  aluno: Aluno;
  disciplinas: Disciplina[];
}

function ResumoAluno({ aluno, disciplinas }: ResumoAlunoProps) {
  const cargaTotal = disciplinas.reduce((soma, disciplina) => soma + disciplina.carga_horaria, 0);
  const aprovado = aluno.media >= 6;

  return (
    <aside className="resumo-aluno">
      <h3>Resumo</h3>

      <div className="resumo-aluno-numeros">
        <div>
          <span className="media-valor">{cargaTotal}</span>
          <span className="media-rotulo">horas cursadas</span>
        </div>
        <div>
          <span className="media-valor">{disciplinas.length}</span>
          <span className="media-rotulo">disciplina(s)</span>
        </div>
      </div>

      <span className={aprovado ? "selo selo-aprovado" : "selo selo-reprovado"}>
        {aprovado ? "Aprovado" : "Reprovado"}
      </span>
    </aside>
  );
}

export default ResumoAluno;
