import Markdown from "components/atomics/Markdown";
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

      {markdownText && <Markdown markdownText={markdownText} />}
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
        {markdownText && <Markdown markdownText={markdownText} />}
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
