import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
};
function MainLayout({ children, hideHeader = false }: Props): JSX.Element {
  return (
    <>
      <Navigation />
      <S.Container>
        {!hideHeader && <LayoutHeader />}
        <S.BodyContainer>{children}</S.BodyContainer>
      </S.Container>
    </>
  );
}

export default MainLayout;
