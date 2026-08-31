import { useEffect, useState } from "react";
import type { Aluno } from "../types";
import { excluirAluno, listarAlunos } from "../api";
import BotaoVoltar from "./BotaoVoltar";
import Filtros from "./Filtros";
import FormAluno from "./FormAluno";
import ListaAlunos from "./ListaAlunos";

interface PainelAlunosProps {
  aoVoltar: () => void;
}

function PainelAlunos({ aoVoltar }: PainelAlunosProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [q, setQ] = useState("");
  const [idadeMinima, setIdadeMinima] = useState("");
  const [mediaMinima, setMediaMinima] = useState("");

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro("");

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

  function aoCriarAluno(novoAluno: Aluno) {
    setAlunos([...alunos, novoAluno]);
    limparFiltros();
  }

  async function aoExcluir(id: number) {
    try {
      await excluirAluno(id);
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    } catch (erro) {
      setErro((erro as Error).message);
    }
  }

  useEffect(() => {
    document.title = `Portal — ${alunos.length} alunos`;
  }, [alunos]);

  const temFiltroAtivo = q !== "" || idadeMinima !== "" || mediaMinima !== "";
  const mensagemVazia = temFiltroAtivo
    ? "Nenhum aluno encontrado com esses filtros."
    : "Nenhum aluno cadastrado ainda.";

  return (
    <main className="conteudo">
      <section className="painel">
        <BotaoVoltar aoVoltar={aoVoltar} />
        <Filtros
          q={q}
          idadeMinima={idadeMinima}
          mediaMinima={mediaMinima}
          aoMudarQ={setQ}
          aoMudarIdadeMinima={setIdadeMinima}
          aoMudarMediaMinima={setMediaMinima}
          aoLimpar={limparFiltros}
        />
        {carregando && <p className="mensagem-status">Carregando...</p>}
        {!carregando && erro !== "" && <p className="mensagem-erro">{erro}</p>}
        {!carregando && erro === "" && (
          <>
            <p className="contagem">
              <strong>{alunos.length}</strong> aluno(s) encontrado(s)
            </p>
            <ListaAlunos alunos={alunos} mensagemVazia={mensagemVazia} aoExcluir={aoExcluir} />
          </>
        )}
      </section>

      <FormAluno aoCriarAluno={aoCriarAluno} />
    </main>
  );
}

export default PainelAlunos;
