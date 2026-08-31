import type { Aluno, Disciplina } from "./types";

export const alunosIniciais: Aluno[] = [
  { id: 1, nome: "Ana Beatriz Souza", idade: 19, matricula: "2026001", media: 8.5 },
  { id: 2, nome: "Carlos Eduardo Lima", idade: 21, matricula: "2026002", media: 4.2 },
  { id: 3, nome: "Fernanda Torres", idade: 17, matricula: "2026003", media: 9.0 },
  { id: 4, nome: "Bruno Martins", idade: 20, matricula: "2026004", media: 6.0 },
  { id: 5, nome: "Juliana Alves", idade: 18, matricula: "2026005", media: 3.9 },
  { id: 6, nome: "Rafael Costa", idade: 22, matricula: "2026006", media: 7.8 },
  { id: 7, nome: "Camila Rocha", idade: 16, matricula: "2026007", media: 8.1 },
  { id: 8, nome: "Pedro Henrique", idade: 19, matricula: "2026008", media: 5.5 },
];

export const disciplinasIniciais: Disciplina[] = [
  { id: 1, nome: "Python", carga_horaria: 40 },
  { id: 2, nome: "Banco de Dados", carga_horaria: 60 },
  { id: 3, nome: "Estrutura de Dados", carga_horaria: 80 },
  { id: 4, nome: "Desenvolvimento Web", carga_horaria: 50 },
];
