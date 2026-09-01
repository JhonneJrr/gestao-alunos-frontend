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

export interface DisciplinaEntrada {
  nome: string;
  carga_horaria: number;
}

export interface DisciplinaComContagem extends Disciplina {
  totalAlunos: number;
}

export interface FiltrosAluno {
  q?: string;
  idade_minima?: number;
  media_minima?: number;
}

export interface Matricula {
  aluno_id: number;
  disciplina_id: number;
}

export interface Nota {
  aluno_id: number;
  disciplina_id: number;
  valor: number;
}

export interface Frequencia {
  aluno_id: number;
  disciplina_id: number;
  presencas: number;
  total_aulas: number;
}

export interface Aviso {
  id: number;
  titulo: string;
  mensagem: string;
  data: string;
}

export interface AvisoEntrada {
  titulo: string;
  mensagem: string;
  data: string;
}

export type Tela =
  | "entry"
  | "carregando"
  | "home"
  | "alunos"
  | "disciplinas"
  | "matriculas"
  | "dashboard"
  | "boletim"
  | "frequencia"
  | "avisos";
