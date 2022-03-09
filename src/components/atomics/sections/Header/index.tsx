import Logo from "assets/icons/logo.svg";
import * as S from "./styles";

export type Props = {
  sideLogo?: string;
  rightComponent?: JSX.Element;
};
function Header({ sideLogo, rightComponent }: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.Logo src={Logo} alt="logo" />
        <S.Divider>|</S.Divider>
        <S.Logo src={sideLogo} alt="side-logo" />
      </S.LeftContainer>
      {rightComponent && <S.RightContainer>{rightComponent}</S.RightContainer>}
    </S.Container>
  );
}

export default Header;
