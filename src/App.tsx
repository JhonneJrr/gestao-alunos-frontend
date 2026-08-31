import { useEffect, useState } from "react";
import type { Tela } from "./types";
import Cabecalho from "./components/Cabecalho";
import PainelAlunos from "./components/PainelAlunos";
import TelaEntry from "./components/TelaEntry";

function App() {
  const [tela, setTela] = useState<Tela>("entry");

  useEffect(() => {
    if (tela !== "alunos") {
      document.title = "Portal de Gestão Escolar";
    }
  }, [tela]);

  if (tela === "entry") {
    return <TelaEntry aoEntrar={() => setTela("alunos")} />;
  }

  return (
    <div className="pagina">
      <Cabecalho />
      <PainelAlunos />
    </div>
  );
}

export default App;
