import * as S from "./styles";

export type Props = {
  label?: string;
  color?: string;
  data: string | JSX.Element | JSX.Element[];
};
function Data({ data, label, color }: Props): JSX.Element {
  return (
    <S.Container>
      <S.Data color={color}>{data}</S.Data>
      {label && <S.Label>{label}</S.Label>}
    </S.Container>
  );
}

export default Data;
