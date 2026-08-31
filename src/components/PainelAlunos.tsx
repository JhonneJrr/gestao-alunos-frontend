import { useEffect, useState } from "react";
import type { Aluno } from "../types";
import { listarAlunos } from "../api";
import Filtros from "./Filtros";
import ListaAlunos from "./ListaAlunos";

function PainelAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [q, setQ] = useState("");
  const [idadeMinima, setIdadeMinima] = useState("");
  const [mediaMinima, setMediaMinima] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarAlunos({
          q: q === "" ? undefined : q,
          idade_minima: idadeMinima === "" ? undefined : Number(idadeMinima),
          media_minima: mediaMinima === "" ? undefined : Number(mediaMinima),
        });
        setAlunos(dados);
      } catch {
        setErro("Não foi possível carregar os alunos.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [q, idadeMinima, mediaMinima]);

  function limparFiltros() {
    setQ("");
    setIdadeMinima("");
    setMediaMinima("");
  }

  if (carregando) {
    return <p className="mensagem-status">Carregando...</p>;
  }

  if (erro) {
    return <p className="mensagem-erro">{erro}</p>;
  }

  const temFiltroAtivo = q !== "" || idadeMinima !== "" || mediaMinima !== "";
  const mensagemVazia = temFiltroAtivo
    ? "Nenhum aluno encontrado com esses filtros."
    : "Nenhum aluno cadastrado ainda.";

  return (
    <section className="painel">
      <Filtros
        q={q}
        idadeMinima={idadeMinima}
        mediaMinima={mediaMinima}
        aoMudarQ={setQ}
        aoMudarIdadeMinima={setIdadeMinima}
        aoMudarMediaMinima={setMediaMinima}
        aoLimpar={limparFiltros}
      />
      <p className="contagem">
        <strong>{alunos.length}</strong> aluno(s) encontrado(s)
      </p>
      <ListaAlunos alunos={alunos} mensagemVazia={mensagemVazia} />
    </section>
  );
}

export default PainelAlunos;
