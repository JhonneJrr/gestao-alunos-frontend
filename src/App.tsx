import { useEffect, useState } from "react";
import type { Tela } from "./types";
import Cabecalho from "./components/Cabecalho";
import PainelAlunos from "./components/PainelAlunos";
import TelaDashboard from "./components/TelaDashboard";
import TelaDisciplinas from "./components/TelaDisciplinas";
import TelaEntry from "./components/TelaEntry";
import TelaHome from "./components/TelaHome";
import TelaMatriculas from "./components/TelaMatriculas";

function App() {
  const [tela, setTela] = useState<Tela>("entry");

  useEffect(() => {
    if (tela !== "alunos") {
      document.title = "Portal de Gestão Escolar";
    }
  }, [tela]);

  if (tela === "entry") {
    return <TelaEntry aoEntrar={() => setTela("home")} />;
  }

  return (
    <div className="pagina">
      <Cabecalho aoIrParaHome={() => setTela("home")} />
      {tela === "home" && <TelaHome aoAbrirTela={setTela} />}
      {tela === "alunos" && <PainelAlunos aoVoltar={() => setTela("home")} />}
      {tela === "disciplinas" && <TelaDisciplinas aoVoltar={() => setTela("home")} />}
      {tela === "matriculas" && <TelaMatriculas aoVoltar={() => setTela("home")} />}
      {tela === "dashboard" && <TelaDashboard aoVoltar={() => setTela("home")} />}
    </div>
  );
}

export default App;
