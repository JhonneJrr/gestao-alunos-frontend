import type { ReactNode } from "react";

interface CardFuncaoProps {
  titulo: string;
  descricao: string;
  aoAbrir: () => void;
  children: ReactNode;
}

function CardFuncao({ titulo, descricao, aoAbrir, children }: CardFuncaoProps) {
  return (
    <button type="button" className="card-funcao" onClick={aoAbrir}>
      <span className="card-funcao-icone">{children}</span>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </button>
  );
}

export default CardFuncao;
