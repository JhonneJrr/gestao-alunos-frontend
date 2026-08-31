import type { Aluno, FiltrosAluno } from "./types";
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
