import Cabecalho from "./components/Cabecalho";
import AlunoCard from "./components/AlunoCard";
import { alunosIniciais } from "./mock";

function App() {
  // provisório: no Desafio 1 os dados passam a vir do api.ts
  return (
    <div className="pagina">
      <Cabecalho />
      <AlunoCard aluno={alunosIniciais[0]} />
    </div>
  );
}

export default App;
