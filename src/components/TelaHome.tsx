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
      </div>
    </div>
  );
}

export default TelaHome;
