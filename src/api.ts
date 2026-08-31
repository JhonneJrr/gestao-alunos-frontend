import type { Aluno, AlunoEntrada, Disciplina, FiltrosAluno } from "./types";
import { alunosIniciais, disciplinasIniciais } from "./mock";

export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let bancoAlunos: Aluno[] = [...alunosIniciais];
let bancoDisciplinas: Disciplina[] = [...disciplinasIniciais];

export async function listarAlunos(filtros?: FiltrosAluno): Promise<Aluno[]> {
  await esperar(500);

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
}

export async function listarDisciplinas(): Promise<Disciplina[]> {
  await esperar(400);
  return [...bancoDisciplinas];
}
