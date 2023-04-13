import { useRef } from "react";
import * as S from "./styles";

export type Props = {
  value: number;
  min: number;
  max: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProgressBar({ value, min, max }: Props): JSX.Element {
  const percentage = (value / max) * 100;

  const wrapperRef = useRef(null);
  return (
    <S.Container ref={wrapperRef}>
      <S.Progress progress={percentage} />
      <S.Text>
        {value}/{max}
      </S.Text>
    </S.Container>
  );
}

export default ProgressBar;
