import type { Aluno } from "../types";

interface SeletorAlunosProps {
  alunos: Aluno[];
  alunoSelecionadoId: string;
  aoSelecionar: (id: string) => void;
}

function SeletorAlunos({ alunos, alunoSelecionadoId, aoSelecionar }: SeletorAlunosProps) {
  return (
    <div className="roster-alunos">
      <p className="rotulo-secao">Alunos</p>
      <ul className="roster-lista">
        {alunos.map((aluno) => {
          const selecionado = String(aluno.id) === alunoSelecionadoId;
          const classeItem = selecionado ? "roster-item roster-item-selecionado" : "roster-item";

          return (
            <li key={aluno.id}>
              <button type="button" className={classeItem} onClick={() => aoSelecionar(String(aluno.id))}>
                <span className="roster-item-nome">{aluno.nome}</span>
                <span className="roster-item-matricula">{aluno.matricula}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SeletorAlunos;
