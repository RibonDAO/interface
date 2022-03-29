import * as S from "./styles";

export type Props = {
  children: JSX.Element | JSX.Element[];
};
function CardBlank({ children }: Props): JSX.Element {
  return <S.Container>{children}</S.Container>;
}

export default CardBlank;
