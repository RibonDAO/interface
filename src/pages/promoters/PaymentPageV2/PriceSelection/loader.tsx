import * as S from "./styles";

export function PriceSelectionLoader() {
  return (
    <S.LoaderContainer>
      <S.LoaderShape style={{ width: 200, height: 40 }} />
      <S.LoaderShape style={{ width: 200, height: 10 }} />
    </S.LoaderContainer>
  );
}

export function GivingFeesLoader() {
  return (
    <S.LoaderContainer>
      <S.LoaderShape style={{ width: 200, height: 10, marginBottom: 2 }} />
    </S.LoaderContainer>
  );
}
