import RibonIcon from "assets/icons/logo-full.svg";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

export type Props = {
  text: string;
  backgroundColor?: string;
  onClick?: () => void;
};

export default function MadeByRibonPill({
  text,
  backgroundColor = theme.colors.neutral10,
  onClick,
}: Props) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <S.Pill backgroundColor={backgroundColor} onClick={handleClick}>
      <S.Text>{text}</S.Text>
      <S.Icon src={RibonIcon} alt="Ribon" />
    </S.Pill>
  );
}
