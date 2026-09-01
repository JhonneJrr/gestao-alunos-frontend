import type {
  Aluno,
  AlunoEntrada,
  Aviso,
  AvisoEntrada,
  Disciplina,
  DisciplinaComContagem,
  DisciplinaEntrada,
  FiltrosAluno,
  Frequencia,
  Matricula,
  Nota,
} from "./types";
import {
  alunosIniciais,
  avisosIniciais,
  disciplinasIniciais,
  frequenciasIniciais,
  matriculasIniciais,
  notasIniciais,
} from "./mock";

export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let bancoAlunos: Aluno[] = [...alunosIniciais];
let bancoDisciplinas: Disciplina[] = [...disciplinasIniciais];
let bancoMatriculas: Matricula[] = [...matriculasIniciais];
let bancoNotas: Nota[] = [...notasIniciais];
let bancoFrequencias: Frequencia[] = [...frequenciasIniciais];
let bancoAvisos: Aviso[] = [...avisosIniciais];
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

// =========================== NOTAS (BOLETIM) ===========================

export async function notasDoAluno(alunoId: number): Promise<(Disciplina & { nota: number })[]> {
  await esperar(300);

  const alunoExiste = bancoAlunos.some((aluno) => aluno.id === alunoId);
  if (!alunoExiste) {
    throw new Error("Aluno não encontrado");
  }

  const resultado: (Disciplina & { nota: number })[] = [];

  for (const nota of bancoNotas) {
    if (nota.aluno_id !== alunoId) {
      continue;
    }
    const disciplina = bancoDisciplinas.find((disciplina) => disciplina.id === nota.disciplina_id);
    if (disciplina) {
      resultado.push({ ...disciplina, nota: nota.valor });
    }
  }

  return resultado;
}

export async function lancarNota(alunoId: number, disciplinaId: number, valor: number): Promise<void> {
  await esperar(300);

  const matriculado = bancoMatriculas.some(
    (matricula) => matricula.aluno_id === alunoId && matricula.disciplina_id === disciplinaId
  );
  if (!matriculado) {
    throw new Error("O aluno não está matriculado nessa disciplina");
  }

  const notaExistente = bancoNotas.some(
    (nota) => nota.aluno_id === alunoId && nota.disciplina_id === disciplinaId
  );

  if (notaExistente) {
    bancoNotas = bancoNotas.map((nota) => {
      if (nota.aluno_id === alunoId && nota.disciplina_id === disciplinaId) {
        return { ...nota, valor };
      }
      return nota;
    });
  } else {
    bancoNotas = [...bancoNotas, { aluno_id: alunoId, disciplina_id: disciplinaId, valor }];
  }
}

// =========================== FREQUÊNCIA ===========================

export interface DisciplinaComFrequencia extends Disciplina {
  presencas: number;
  total_aulas: number;
  percentual: number;
}

export async function frequenciasDoAluno(alunoId: number): Promise<DisciplinaComFrequencia[]> {
  await esperar(300);

  const alunoExiste = bancoAlunos.some((aluno) => aluno.id === alunoId);
  if (!alunoExiste) {
    throw new Error("Aluno não encontrado");
  }

  const resultado: DisciplinaComFrequencia[] = [];

  for (const frequencia of bancoFrequencias) {
    if (frequencia.aluno_id !== alunoId) {
      continue;
    }
    const disciplina = bancoDisciplinas.find((disciplina) => disciplina.id === frequencia.disciplina_id);
    if (disciplina) {
      const percentual = Math.round((frequencia.presencas / frequencia.total_aulas) * 100);
      resultado.push({
        ...disciplina,
        presencas: frequencia.presencas,
        total_aulas: frequencia.total_aulas,
        percentual,
      });
    }
  }

  return resultado;
}

// =========================== AVISOS ===========================

export async function listarAvisos(): Promise<Aviso[]> {
  await esperar(300);
  return [...bancoAvisos].reverse();
}

export async function criarAviso(dados: AvisoEntrada): Promise<Aviso> {
  await esperar(300);

  const novoId = Math.max(0, ...bancoAvisos.map((aviso) => aviso.id)) + 1;
  const novoAviso: Aviso = { id: novoId, ...dados };
  bancoAvisos = [...bancoAvisos, novoAviso];

  return novoAviso;
}

export async function excluirAviso(id: number): Promise<void> {
  await esperar(300);

  const existe = bancoAvisos.some((aviso) => aviso.id === id);
  if (!existe) {
    throw new Error("Aviso não encontrado");
  }

  bancoAvisos = bancoAvisos.filter((aviso) => aviso.id !== id);
}
