import { useEffect, useState, useCallback } from "react";
import * as S from "./styles";

export type Props = {
  leftText: string;
  rightText: string;
  onClick: () => void;
  isRightSelected?: boolean;
};
function ToggleSwitchText({
  leftText,
  rightText,
  onClick,
  isRightSelected = true,
}: Props): JSX.Element {
  const [isRight, setIsRight] = useState(isRightSelected);

  const handleChange = useCallback(async () => {
    setIsRight(!isRight);
    onClick();
  }, [isRight]);

  useEffect(() => {
    handleChange();
  }, []);

  return isRight ? (
    <S.Container>
      <S.Unselected onClick={handleChange}>{leftText}</S.Unselected>
      <S.Selected>{rightText}</S.Selected>
    </S.Container>
  ) : (
    <S.Container>
      <S.Selected>{leftText}</S.Selected>
      <S.Unselected onClick={handleChange}>{rightText}</S.Unselected>
    </S.Container>
  );
}

export default ToggleSwitchText;
