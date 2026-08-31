import { useEffect, useState } from "react";
import type { Tela } from "./types";
import Cabecalho from "./components/Cabecalho";
import PainelAlunos from "./components/PainelAlunos";
import TelaCarregando from "./components/TelaCarregando";
import TelaDashboard from "./components/TelaDashboard";
import TelaDisciplinas from "./components/TelaDisciplinas";
import TelaEntry from "./components/TelaEntry";
import TelaHome from "./components/TelaHome";
import TelaMatriculas from "./components/TelaMatriculas";

interface OrigemTransicao {
  x: number;
  y: number;
  largura: number;
  altura: number;
}

function App() {
  const [tela, setTela] = useState<Tela>("entry");
  const [transicao, setTransicao] = useState<OrigemTransicao | null>(null);

  useEffect(() => {
    if (tela !== "alunos") {
      document.title = "Portal de Gestão Escolar";
    }
  }, [tela]);

  function abrirComTransicao(novaTela: Tela, evento: React.MouseEvent<HTMLButtonElement>) {
    const retangulo = evento.currentTarget.getBoundingClientRect();
    setTransicao({
      x: retangulo.left,
      y: retangulo.top,
      largura: retangulo.width,
      altura: retangulo.height,
    });
    window.setTimeout(() => setTela(novaTela), 360);
    window.setTimeout(() => setTransicao(null), 800);
  }

  if (tela === "entry") {
    return <TelaEntry aoEntrar={() => setTela("carregando")} />;
  }

  if (tela === "carregando") {
    return <TelaCarregando aoConcluir={() => setTela("home")} />;
  }

  return (
    <div className="pagina">
      {transicao && (
        <div
          className="transicao-card"
          style={
            {
              "--origem-x": `${transicao.x}px`,
              "--origem-y": `${transicao.y}px`,
              "--origem-w": `${transicao.largura}px`,
              "--origem-h": `${transicao.altura}px`,
            } as React.CSSProperties
          }
        ></div>
      )}

      <Cabecalho aoIrParaHome={() => setTela("home")} />
      {tela === "home" && <TelaHome aoAbrirTela={abrirComTransicao} />}
      {tela === "alunos" && <PainelAlunos aoVoltar={() => setTela("home")} />}
      {tela === "disciplinas" && <TelaDisciplinas aoVoltar={() => setTela("home")} />}
      {tela === "matriculas" && <TelaMatriculas aoVoltar={() => setTela("home")} />}
      {tela === "dashboard" && <TelaDashboard aoVoltar={() => setTela("home")} />}
    </div>
  );
}

export default App;
