import Logo from "assets/icons/logo.svg";
import ArrowLeft from "assets/icons/arrow-left-green.svg";
import { incrementLocalStorageValue } from "config/debugEventsView/helpers";
import * as S from "./styles";

export type Props = {
  sideLogo?: string;
  onSideLogoClick?: () => void;
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
};
function Header({
  sideLogo,
  rightComponent,
  hasBackButton = false,
  onBackButtonClick,
  onSideLogoClick,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.InsideContainer>
        {hasBackButton ? (
          <S.BackButtonImage
            src={ArrowLeft}
            alt="back-button"
            onClick={onBackButtonClick}
          />
        ) : (
          <>
            <S.Logo
              src={Logo}
              alt="logo"
              onClick={incrementLocalStorageValue}
            />
            {sideLogo && (
              <>
                <S.Divider>|</S.Divider>
                <S.Logo
                  src={sideLogo}
                  alt="side-logo"
                  onClick={onSideLogoClick}
                />{" "}
              </>
            )}
          </>
        )}
      </S.InsideContainer>
      {rightComponent && (
        <S.InsideContainer>{rightComponent}</S.InsideContainer>
      )}
    </S.Container>
  );
}

export default Header;
