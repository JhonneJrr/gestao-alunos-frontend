import { useEffect, useState } from "react";
import type { Aluno, Disciplina } from "../types";
import { listarAlunos, listarDisciplinas } from "../api";
import BotaoVoltar from "./BotaoVoltar";

interface TelaDashboardProps {
  aoVoltar: () => void;
}

function TelaDashboard({ aoVoltar }: TelaDashboardProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const alunosCarregados = await listarAlunos();
        const disciplinasCarregadas = await listarDisciplinas();
        setAlunos(alunosCarregados);
        setDisciplinas(disciplinasCarregadas);
      } catch {
        setErro("Não foi possível carregar os indicadores.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) {
    return (
      <div className="tela-dashboard">
        <BotaoVoltar aoVoltar={aoVoltar} />
        <p className="mensagem-status">Carregando...</p>
      </div>
    );
  }

  if (erro !== "") {
    return (
      <div className="tela-dashboard">
        <BotaoVoltar aoVoltar={aoVoltar} />
        <p className="mensagem-erro">{erro}</p>
      </div>
    );
  }

  const total = alunos.length;
  const aprovados = alunos.filter((aluno) => aluno.media >= 6).length;
  const reprovados = total - aprovados;
  const somaMedias = alunos.reduce((soma, aluno) => soma + aluno.media, 0);
  const mediaGeral = total === 0 ? 0 : somaMedias / total;
  const totalDisciplinas = disciplinas.length;
  const cargaTotal = disciplinas.reduce((soma, disciplina) => soma + disciplina.carga_horaria, 0);
  const percentualAprovados = total === 0 ? 0 : Math.round((aprovados / total) * 100);

  return (
    <div className="tela-dashboard">
      <BotaoVoltar aoVoltar={aoVoltar} />

      <div className="grade-indicadores">
        <div className="indicador">
          <span className="indicador-valor">{total}</span>
          <span className="indicador-rotulo">alunos</span>
        </div>
        <div className="indicador">
          <span className="indicador-valor">{mediaGeral.toFixed(1)}</span>
          <span className="indicador-rotulo">média geral</span>
        </div>
        <div className="indicador">
          <span className="indicador-valor">{totalDisciplinas}</span>
          <span className="indicador-rotulo">disciplinas</span>
        </div>
        <div className="indicador">
          <span className="indicador-valor">{cargaTotal}</span>
          <span className="indicador-rotulo">horas totais</span>
        </div>
      </div>

      <div className="painel-aprovacao">
        <p className="contagem">
          <strong>{aprovados}</strong> aprovado(s) · <strong>{reprovados}</strong> reprovado(s)
        </p>
        <div className="barra">
          <div className="barra-aprovados" style={{ width: `${percentualAprovados}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default TelaDashboard;
