import Markdown from "react-markdown";
import DefaultBackground from "./assets/DefaultBackground";
import * as S from "./styles";

export type Props = {
  markdownText?: string;
  backgroundImage?: string;
};

function DefaultBackgroundComponent({
  markdownText,
}: {
  markdownText: string | undefined;
}) {
  return (
    <S.Container>
      <S.BackgroundContainer>
        <DefaultBackground />
      </S.BackgroundContainer>

      <S.MarkdownContainer>
        <Markdown>{markdownText}</Markdown>
      </S.MarkdownContainer>
    </S.Container>
  );
}

function ImageBackgroundComponent({ markdownText, backgroundImage }: Props) {
  return (
    <S.Container>
      <S.ImageBackground
        imageUrl={backgroundImage}
        data-testid="image-background"
      >
        <S.MarkdownContainer>
          <Markdown>{markdownText}</Markdown>
        </S.MarkdownContainer>
      </S.ImageBackground>
    </S.Container>
  );
}

function CardNonProfitStories({ markdownText, backgroundImage }: Props) {
  return (
    <S.Container>
      {backgroundImage ? (
        <ImageBackgroundComponent
          markdownText={markdownText}
          backgroundImage={backgroundImage}
        />
      ) : (
        <DefaultBackgroundComponent markdownText={markdownText} />
      )}
    </S.Container>
  );
}

export default CardNonProfitStories;
