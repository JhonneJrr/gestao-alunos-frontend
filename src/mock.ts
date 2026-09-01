import type { Aluno, Aviso, Disciplina, Frequencia, Matricula, Nota } from "./types";

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

export const matriculasIniciais: Matricula[] = [
  { aluno_id: 1, disciplina_id: 1 },
  { aluno_id: 1, disciplina_id: 2 },
  { aluno_id: 2, disciplina_id: 1 },
  { aluno_id: 3, disciplina_id: 3 },
  { aluno_id: 4, disciplina_id: 4 },
  { aluno_id: 6, disciplina_id: 2 },
];

export const notasIniciais: Nota[] = [
  { aluno_id: 1, disciplina_id: 1, valor: 8.0 },
  { aluno_id: 1, disciplina_id: 2, valor: 9.0 },
  { aluno_id: 2, disciplina_id: 1, valor: 4.5 },
  { aluno_id: 3, disciplina_id: 3, valor: 9.0 },
  { aluno_id: 4, disciplina_id: 4, valor: 6.0 },
  { aluno_id: 6, disciplina_id: 2, valor: 7.8 },
];

export const frequenciasIniciais: Frequencia[] = [
  { aluno_id: 1, disciplina_id: 1, presencas: 18, total_aulas: 20 },
  { aluno_id: 1, disciplina_id: 2, presencas: 20, total_aulas: 20 },
  { aluno_id: 2, disciplina_id: 1, presencas: 12, total_aulas: 20 },
  { aluno_id: 3, disciplina_id: 3, presencas: 19, total_aulas: 20 },
  { aluno_id: 4, disciplina_id: 4, presencas: 15, total_aulas: 20 },
  { aluno_id: 6, disciplina_id: 2, presencas: 17, total_aulas: 20 },
];

export const avisosIniciais: Aviso[] = [
  { id: 1, titulo: "Feriado", mensagem: "Não haverá aula no dia 7 de setembro.", data: "30/08/2026" },
  { id: 2, titulo: "Reunião de pais", mensagem: "Reunião de pais e mestres marcada para o fim do mês.", data: "01/09/2026" },
  { id: 3, titulo: "Prova de Python", mensagem: "A prova da disciplina de Python será no dia 10/09.", data: "05/09/2026" },
];
