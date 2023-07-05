import * as S from "./styles";

export type Props = {
  children: JSX.Element | JSX.Element[];
  border: boolean;
  backgroundColor: string;
};
function Card({ children, border, backgroundColor }: Props): JSX.Element {
  return (
    <S.Container backgroundColor={backgroundColor} border={border}>
      {children}
    </S.Container>
  );
}

export default Card;
