import { useState } from "react";
import type { Disciplina } from "../types";
import { criarDisciplina } from "../api";

interface FormDisciplinaProps {
  aoCriarDisciplina: (nova: Disciplina) => void;
}

function FormDisciplina({ aoCriarDisciplina }: FormDisciplinaProps) {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function limparCampos() {
    setNome("");
    setCargaHoraria("");
  }

  async function aoEnviar(evento: React.FormEvent) {
    evento.preventDefault();
    setMensagemErro("");

    if (nome.trim() === "") {
      setMensagemErro("Informe o nome da disciplina.");
      return;
    }

    const cargaNumero = Number(cargaHoraria);
    if (cargaHoraria.trim() === "" || Number.isNaN(cargaNumero) || cargaNumero <= 0) {
      setMensagemErro("Informe uma carga horária maior que zero.");
      return;
    }

    try {
      const novaDisciplina = await criarDisciplina({
        nome,
        carga_horaria: cargaNumero,
      });
      aoCriarDisciplina(novaDisciplina);
      limparCampos();
    } catch (erro) {
      setMensagemErro((erro as Error).message);
    }
  }

  return (
    <aside className="form-cadastro">
      <h2>Cadastrar disciplina</h2>
      <p>Preencha os dados para adicionar uma nova disciplina ao portal.</p>

      <form onSubmit={aoEnviar}>
        <div className="campo">
          <label htmlFor="nome-disciplina">Nome</label>
          <input
            id="nome-disciplina"
            type="text"
            placeholder="Ex.: Redes de Computadores"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="carga-horaria">Carga horária</label>
          <input
            id="carga-horaria"
            type="number"
            placeholder="Ex.: 60"
            value={cargaHoraria}
            onChange={(evento) => setCargaHoraria(evento.target.value)}
          />
        </div>

        {mensagemErro !== "" && <p className="campo-erro">{mensagemErro}</p>}

        <button className="botao-primario" type="submit">
          Cadastrar disciplina
        </button>
      </form>
    </aside>
  );
}

export default FormDisciplina;
