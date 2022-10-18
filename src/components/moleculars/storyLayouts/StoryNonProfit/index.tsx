import { useEffect, useState } from "react";
import Story from "types/entities/Story";
import securityIcon from "assets/icons/security-mark-icon.svg";
import getDominantColor from "lib/getDominantColor";
import * as S from "./styles";

export type Props = {
  story: Story;
};

function StoryNonProfit({ story }: Props): JSX.Element {
  const [dominantColor, setDominantColor] = useState<string>("transparent");

  useEffect(() => {
    getDominantColor(story.nonProfit.logo).then((color) => {
      setDominantColor(color);
    });
  }, []);

  return (
    <S.Container image={story.image}>
      <S.Content>
        <S.TopFooterRow color={dominantColor}>
          <S.Title>{story.title}</S.Title>
          <S.Description>{story.description}</S.Description>
        </S.TopFooterRow>
        <S.BottomFooterRow>
          <S.AvatarImage src={story.nonProfit.logo} />
          <S.NonProfitInfo>
            <S.Info>
              {story.nonProfit.name}
              <S.Icon src={securityIcon} />
            </S.Info>
            <S.SmallInfo>{story.nonProfit.cause.name}</S.SmallInfo>
          </S.NonProfitInfo>
        </S.BottomFooterRow>
      </S.Content>
    </S.Container>
  );
}

export default StoryNonProfit;
