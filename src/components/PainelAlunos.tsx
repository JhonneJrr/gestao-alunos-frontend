import { useEffect, useState } from "react";
import type { Aluno } from "../types";
import { listarAlunos } from "../api";
import ListaAlunos from "./ListaAlunos";

function PainelAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarAlunos();
        setAlunos(dados);
      } catch {
        setErro("Não foi possível carregar os alunos.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) {
    return <p className="mensagem-status">Carregando...</p>;
  }

  if (erro) {
    return <p className="mensagem-erro">{erro}</p>;
  }

  return (
    <section className="painel">
      <ListaAlunos alunos={alunos} />
    </section>
  );
}

export default PainelAlunos;
