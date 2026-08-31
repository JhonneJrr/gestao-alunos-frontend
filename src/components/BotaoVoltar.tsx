interface BotaoVoltarProps {
  aoVoltar: () => void;
}

function BotaoVoltar({ aoVoltar }: BotaoVoltarProps) {
  return (
    <button className="botao-voltar" type="button" onClick={aoVoltar}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>
      Voltar
    </button>
  );
}

export default BotaoVoltar;
