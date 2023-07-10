import { newLogEvent } from "lib/events";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  text?: string;
  onClose?: () => void;
  textOrigin?: string;
  textDestiny?: string;
  iconOrigin?: string;
  iconDestiny?: string;
  customStyles?: ReactModal.Styles;
  icon?: string;
  isIconDestinyFullSize?: boolean;
  isIconOriginFullSize?: boolean;
  color?: string;
  eventName?: string;
  eventParams?: Record<string, any>;
  onAnimationEnd?: () => void;
};

const { primary } = theme.colors.brand;

function TransferAnimation({
  text,
  textOrigin,
  textDestiny,
  iconOrigin,
  iconDestiny,
  icon,
  isIconDestinyFullSize = false,
  isIconOriginFullSize = false,
  color = primary[300],
  eventName,
  eventParams,
  onAnimationEnd,
}: Props): JSX.Element {
  const [logged, setLogged] = useState(false);
  const ANIMATION_DURATION = 2700;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onAnimationEnd) onAnimationEnd();
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }, [onAnimationEnd]);

  if (eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    setLogged(true);
  }

  const [iconLoaded, setIconLoaded] = useState(false);

  const renderDiamond = (isFullSize: boolean, image: string) =>
    isFullSize ? (
      <S.Diamond bg={image} mainColor={color} />
    ) : (
      <S.Diamond mainColor={color}>
        <S.Icon src={image} alt="icon" />
      </S.Diamond>
    );

  return (
    <S.Container>
      <S.AnimationContainer>
        <S.AnimationContent>
          {iconOrigin && renderDiamond(isIconOriginFullSize, iconOrigin)}
          <S.IconDescription>{textOrigin}</S.IconDescription>
        </S.AnimationContent>
        <S.AnimationContent>
          <S.ProgressBar>
            <S.ProgressImg
              src={icon}
              alt="icon"
              onLoad={() => setIconLoaded(true)}
              loaded={iconLoaded}
            />
          </S.ProgressBar>
        </S.AnimationContent>
        <S.AnimationContent>
          {iconDestiny && renderDiamond(isIconDestinyFullSize, iconDestiny)}
          <S.IconDescription>{textDestiny}</S.IconDescription>
        </S.AnimationContent>
      </S.AnimationContainer>
      <S.Text color={color}>{text}</S.Text>
    </S.Container>
  );
}

export default TransferAnimation;
