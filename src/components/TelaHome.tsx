import type { Tela } from "../types";
import CardFuncao from "./CardFuncao";

interface TelaHomeProps {
  aoAbrirTela: (tela: Tela) => void;
}

function TelaHome({ aoAbrirTela }: TelaHomeProps) {
  return (
    <div className="tela-home">
      <h2>O que você quer fazer?</h2>
      <div className="grade-funcoes">
        <CardFuncao
          titulo="Gestão de Alunos"
          descricao="Listar, filtrar, cadastrar e excluir alunos."
          aoAbrir={() => aoAbrirTela("alunos")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </CardFuncao>

        <CardFuncao
          titulo="Disciplinas"
          descricao="Ver as disciplinas oferecidas pelo portal."
          aoAbrir={() => aoAbrirTela("disciplinas")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v16"></path>
            <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"></path>
          </svg>
        </CardFuncao>

        <CardFuncao
          titulo="Matrículas"
          descricao="Ver e vincular alunos às disciplinas."
          aoAbrir={() => aoAbrirTela("matriculas")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
            <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
            <line x1="8" x2="16" y1="12" y2="12"></line>
          </svg>
        </CardFuncao>
      </div>
    </div>
  );
}

export default TelaHome;
