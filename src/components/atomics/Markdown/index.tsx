import MarkdownComponent from "markdown-to-jsx";
import * as S from "./styles";

function Markdown({ markdownText }: { markdownText: string }) {
  return (
    <S.MarkdownContainer>
      <MarkdownComponent>{markdownText}</MarkdownComponent>
    </S.MarkdownContainer>
  );
}

export default Markdown;
