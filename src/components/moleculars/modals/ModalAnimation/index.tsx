import { newLogEvent } from "lib/events";
import React, { useState } from "react";
import ReactModal from "react-modal";
import theme from "styles/theme";
import { defaultCustomStyles } from "../defaultCustomStyles";
import * as S from "./styles";

export type Props = {
  visible?: boolean;
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
};

const { primary } = theme.colors.brand;

function ModalAnimation({
  visible = false,
  text,
  onClose = () => {},
  customStyles,
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
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
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
    <S.BlankModal
      isOpen={visible}
      onRequestClose={onClose}
      style={{ ...defaultCustomStyles, ...customStyles }}
      ariaHideApp={false}
    >
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
    </S.BlankModal>
  );
}

export default ModalAnimation;
