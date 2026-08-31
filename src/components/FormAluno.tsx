import { useState } from "react";
import type { Aluno } from "../types";
import { criarAluno } from "../api";

interface FormAlunoProps {
  aoCriarAluno: (novo: Aluno) => void;
}

function FormAluno({ aoCriarAluno }: FormAlunoProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [matricula, setMatricula] = useState("");
  const [media, setMedia] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function limparCampos() {
    setNome("");
    setIdade("");
    setMatricula("");
    setMedia("");
  }

  async function aoEnviar(evento: React.FormEvent) {
    evento.preventDefault();
    setMensagemErro("");

    if (nome.trim() === "") {
      setMensagemErro("Informe o nome do aluno.");
      return;
    }

    if (matricula.trim() === "") {
      setMensagemErro("Informe a matrícula.");
      return;
    }

    const idadeNumero = Number(idade);
    if (idade.trim() === "" || Number.isNaN(idadeNumero) || idadeNumero < 0 || idadeNumero > 120) {
      setMensagemErro("Informe uma idade entre 0 e 120.");
      return;
    }

    const mediaNumero = Number(media);
    if (media.trim() === "" || Number.isNaN(mediaNumero) || mediaNumero < 0 || mediaNumero > 10) {
      setMensagemErro("Informe uma média entre 0 e 10.");
      return;
    }

    try {
      const novoAluno = await criarAluno({
        nome,
        idade: idadeNumero,
        matricula,
        media: mediaNumero,
      });
      aoCriarAluno(novoAluno);
      limparCampos();
    } catch (erro) {
      setMensagemErro((erro as Error).message);
    }
  }

  return (
    <aside className="form-cadastro">
      <h2>Cadastrar aluno</h2>
      <p>Preencha os dados para adicionar um novo aluno ao portal.</p>

      <form onSubmit={aoEnviar}>
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="idade-form">Idade</label>
          <input
            id="idade-form"
            type="number"
            placeholder="Ex.: 18"
            value={idade}
            onChange={(evento) => setIdade(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="matricula">Matrícula</label>
          <input
            id="matricula"
            type="text"
            placeholder="Ex.: 2026009"
            value={matricula}
            onChange={(evento) => setMatricula(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="media-form">Média</label>
          <input
            id="media-form"
            type="number"
            step="0.1"
            placeholder="Ex.: 7.5"
            value={media}
            onChange={(evento) => setMedia(evento.target.value)}
          />
        </div>

        {mensagemErro !== "" && <p className="campo-erro">{mensagemErro}</p>}

        <button className="botao-primario" type="submit">
          Cadastrar aluno
        </button>
      </form>
    </aside>
  );
}

export default FormAluno;
