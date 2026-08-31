export interface Aluno {
  id: number;
  nome: string;
  idade: number;
  matricula: string;
  media: number;
}

export interface AlunoEntrada {
  nome: string;
  idade: number;
  matricula: string;
  media: number;
}

export interface Disciplina {
  id: number;
  nome: string;
  carga_horaria: number;
}
