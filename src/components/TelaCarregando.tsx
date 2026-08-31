import { useEffect } from "react";
import { precarregar } from "../api";

interface TelaCarregandoProps {
  aoConcluir: () => void;
}

function TelaCarregando({ aoConcluir }: TelaCarregandoProps) {
  useEffect(() => {
    async function preparar() {
      await precarregar();
      aoConcluir();
    }

    preparar();
  }, [aoConcluir]);

  return (
    <div className="tela-carregando">
      <div className="spinner"></div>
      <p>Preparando o portal...</p>
    </div>
  );
}

export default TelaCarregando;
