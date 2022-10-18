import { useEffect, useState } from "react";
import Story from "types/entities/Story";
import NonProfit from "types/entities/NonProfit";
import securityIcon from "assets/icons/security-mark-icon.svg";
import getDominantColor from "lib/getDominantColor";
import * as S from "./styles";

export type Props = {
  story: Story;
  nonProfit: NonProfit;
};

function StoryNonProfit({ story, nonProfit }: Props): JSX.Element {
  const [dominantColor, setDominantColor] = useState<string>("transparent");

  useEffect(() => {
    getDominantColor(nonProfit.logo).then((color) => {
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
          <S.AvatarImage src={nonProfit.logo} />
          <S.NonProfitInfo>
            <S.Info>
              {nonProfit.name}
              <S.Icon src={securityIcon} />
            </S.Info>
            <S.SmallInfo>{nonProfit.cause.name}</S.SmallInfo>
          </S.NonProfitInfo>
        </S.BottomFooterRow>
      </S.Content>
    </S.Container>
  );
}

export default StoryNonProfit;
