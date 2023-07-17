import * as S from "../styles";

export default function Loader() {
  return (
    <div data-testid="checkout-page-loader">
      <S.LoaderShape style={{ width: 200, height: 15 }} />
      <S.LoaderShape style={{ width: 200, height: 40 }} />
      <S.LoaderShape
        style={{ width: 300, height: 10, marginTop: 4, marginBottom: 24 }}
      />
      <S.LoaderShape style={{ width: 100, height: 15, marginBottom: 8 }} />
      <S.LoaderShape style={{ width: "100%", height: 350, marginBottom: 16 }} />
      <S.LoaderShape style={{ width: "100%", height: 48 }} />
    </div>
  );
}
