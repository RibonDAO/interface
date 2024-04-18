import * as S from "./styles";

export type Props = {
  children: JSX.Element | JSX.Element[];
  border: boolean;
  backgroundColor: string;
  borderRadius?: number;
};
function Card({
  children,
  border,
  backgroundColor,
  borderRadius,
  ...props
}: Props): JSX.Element {
  return (
    <S.Container
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      {...props}
    >
      {children}
    </S.Container>
  );
}

export default Card;
