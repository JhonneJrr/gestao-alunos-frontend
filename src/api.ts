import type { Aluno, AlunoEntrada, FiltrosAluno } from "./types";
import { alunosIniciais } from "./mock";

export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let banco: Aluno[] = [...alunosIniciais];

export async function listarAlunos(filtros?: FiltrosAluno): Promise<Aluno[]> {
  await esperar(500);

  let resultado = [...banco];

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

  const jaExiste = banco.some((aluno) => aluno.matricula === dados.matricula);
  if (jaExiste) {
    throw new Error("Já existe um aluno com essa matrícula");
  }

  const novoId = Math.max(0, ...banco.map((aluno) => aluno.id)) + 1;
  const novoAluno: Aluno = { id: novoId, ...dados };
  banco = [...banco, novoAluno];

  return novoAluno;
}

export async function excluirAluno(id: number): Promise<void> {
  await esperar(300);

  const existe = banco.some((aluno) => aluno.id === id);
  if (!existe) {
    throw new Error("Aluno não encontrado");
  }

  banco = banco.filter((aluno) => aluno.id !== id);
}
