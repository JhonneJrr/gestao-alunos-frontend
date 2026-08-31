import type {
  Aluno,
  AlunoEntrada,
  Disciplina,
  DisciplinaComContagem,
  DisciplinaEntrada,
  FiltrosAluno,
  Matricula,
} from "./types";
import { alunosIniciais, disciplinasIniciais, matriculasIniciais } from "./mock";

export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let bancoAlunos: Aluno[] = [...alunosIniciais];
let bancoDisciplinas: Disciplina[] = [...disciplinasIniciais];
let bancoMatriculas: Matricula[] = [...matriculasIniciais];
let precarregado = false;

export async function precarregar(): Promise<void> {
  await esperar(600);
  precarregado = true;
}

export async function listarAlunos(filtros?: FiltrosAluno): Promise<Aluno[]> {
  const temFiltro =
    filtros?.q !== undefined || filtros?.idade_minima !== undefined || filtros?.media_minima !== undefined;

  if (!precarregado || temFiltro) {
    await esperar(500);
  }

  let resultado = [...bancoAlunos];

  if (filtros?.q !== undefined && filtros.q !== "") {
    const busca = filtros.q.toLowerCase();
    resultado = resultado.filter((aluno) => aluno.nome.toLowerCase().includes(busca));
  }

  if (filtros?.idade_minima !== undefined) {
    const idadeMinima = filtros.idade_minima;
    resultado = resultado.filter((aluno) => aluno.idade >= idadeMinima);
  }

  if (filtros?.media_minima !== undefined) {
    const mediaMinima = filtros.media_minima;
    resultado = resultado.filter((aluno) => aluno.media >= mediaMinima);
  }

  return resultado;
}

export async function criarAluno(dados: AlunoEntrada): Promise<Aluno> {
  await esperar(300);

  const jaExiste = bancoAlunos.some((aluno) => aluno.matricula === dados.matricula);
  if (jaExiste) {
    throw new Error("Já existe um aluno com essa matrícula");
  }

  const novoId = Math.max(0, ...bancoAlunos.map((aluno) => aluno.id)) + 1;
  const novoAluno: Aluno = { id: novoId, ...dados };
  bancoAlunos = [...bancoAlunos, novoAluno];

  return novoAluno;
}

export async function excluirAluno(id: number): Promise<void> {
  await esperar(300);

  const existe = bancoAlunos.some((aluno) => aluno.id === id);
  if (!existe) {
    throw new Error("Aluno não encontrado");
  }

  bancoAlunos = bancoAlunos.filter((aluno) => aluno.id !== id);
  bancoMatriculas = bancoMatriculas.filter((matricula) => matricula.aluno_id !== id);
}

export async function listarDisciplinas(): Promise<Disciplina[]> {
  if (!precarregado) {
    await esperar(400);
  }
  return [...bancoDisciplinas];
}

export async function listarDisciplinasComContagem(): Promise<DisciplinaComContagem[]> {
  if (!precarregado) {
    await esperar(400);
  }

  return bancoDisciplinas.map((disciplina) => {
    const totalAlunos = bancoMatriculas.filter(
      (matricula) => matricula.disciplina_id === disciplina.id
    ).length;
    return { ...disciplina, totalAlunos };
  });
}

export async function criarDisciplina(dados: DisciplinaEntrada): Promise<Disciplina> {
  await esperar(300);

  const jaExiste = bancoDisciplinas.some(
    (disciplina) => disciplina.nome.toLowerCase() === dados.nome.toLowerCase()
  );
  if (jaExiste) {
    throw new Error("Já existe uma disciplina com esse nome");
  }

  const novoId = Math.max(0, ...bancoDisciplinas.map((disciplina) => disciplina.id)) + 1;
  const novaDisciplina: Disciplina = { id: novoId, ...dados };
  bancoDisciplinas = [...bancoDisciplinas, novaDisciplina];

  return novaDisciplina;
}

export async function excluirDisciplina(id: number): Promise<void> {
  await esperar(300);

  const existe = bancoDisciplinas.some((disciplina) => disciplina.id === id);
  if (!existe) {
    throw new Error("Disciplina não encontrada");
  }

  bancoDisciplinas = bancoDisciplinas.filter((disciplina) => disciplina.id !== id);
  bancoMatriculas = bancoMatriculas.filter((matricula) => matricula.disciplina_id !== id);
}

export async function disciplinasDoAluno(alunoId: number): Promise<Disciplina[]> {
  await esperar(300);

  const alunoExiste = bancoAlunos.some((aluno) => aluno.id === alunoId);
  if (!alunoExiste) {
    throw new Error("Aluno não encontrado");
  }

  const idsDisciplinas = bancoMatriculas
    .filter((matricula) => matricula.aluno_id === alunoId)
    .map((matricula) => matricula.disciplina_id);

  return bancoDisciplinas.filter((disciplina) => idsDisciplinas.includes(disciplina.id));
}

export async function matricular(alunoId: number, disciplinaId: number): Promise<void> {
  await esperar(300);

  const alunoExiste = bancoAlunos.some((aluno) => aluno.id === alunoId);
  if (!alunoExiste) {
    throw new Error("Aluno não encontrado");
  }

  const disciplinaExiste = bancoDisciplinas.some((disciplina) => disciplina.id === disciplinaId);
  if (!disciplinaExiste) {
    throw new Error("Disciplina não encontrada");
  }

  const jaMatriculado = bancoMatriculas.some(
    (matricula) => matricula.aluno_id === alunoId && matricula.disciplina_id === disciplinaId
  );
  if (jaMatriculado) {
    throw new Error("Este aluno já está matriculado nessa disciplina");
  }

  bancoMatriculas = [...bancoMatriculas, { aluno_id: alunoId, disciplina_id: disciplinaId }];
}
