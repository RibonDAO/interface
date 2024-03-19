import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
  hasBackButton?: boolean;
  outline?: boolean;
  fullSize?: boolean;
  member?: boolean;
};

function MainLayout({
  children,
  hideHeader = false,
  hasBackButton = false,
  outline = false,
  fullSize = false,
  member = false,
}: Props): JSX.Element {
  const { signedIn } = useCurrentUser();

  return (
    <>
      {!isFirstAccess(signedIn) && <Navigation />}
      {!hideHeader && (
        <LayoutHeader
          hasBackButton={hasBackButton}
          outline={outline}
          member={member}
        />
      )}
      <S.MainContainer isFullSize={fullSize}>
        <S.MainBodyContainer isFullSize={fullSize}>
          {children}
        </S.MainBodyContainer>
      </S.MainContainer>
    </>
  );
}

export default MainLayout;
