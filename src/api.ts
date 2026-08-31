import type { Aluno } from "./types";
import { alunosIniciais } from "./mock";

export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let banco: Aluno[] = [...alunosIniciais];

export async function listarAlunos(): Promise<Aluno[]> {
  await esperar(500);
  return [...banco];
}
