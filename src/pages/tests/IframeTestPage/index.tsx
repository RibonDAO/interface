import * as S from "./styles";

function IframeTestPage() {
  return (
    <S.Container>
      <iframe
        src="https://projetos.ribon.io/eventosolidario/carol-e-marcelo"
        title="Ribon Comunidade"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </S.Container>
  );
}

export default IframeTestPage;
