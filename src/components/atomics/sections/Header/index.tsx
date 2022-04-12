import Logo from "assets/icons/logo.svg";
import ArrowLeft from "assets/icons/arrow-left-green.svg";
import * as S from "./styles";

export type Props = {
  sideLogo?: string;
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
};
function Header({
  sideLogo,
  rightComponent,
  hasBackButton = false,
  onBackButtonClick,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        {hasBackButton ? (
          <S.BackButtonImage
            src={ArrowLeft}
            alt="back-button"
            onClick={onBackButtonClick}
          />
        ) : (
          <>
            <S.Logo src={Logo} alt="logo" />
            <S.Divider>|</S.Divider>
            <S.Logo src={sideLogo} alt="side-logo" />
          </>
        )}
      </S.LeftContainer>
      {rightComponent && <S.RightContainer>{rightComponent}</S.RightContainer>}
    </S.Container>
  );
}

export default Header;
