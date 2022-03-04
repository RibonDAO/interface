import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import useBreakpoint from "hooks/useBreakpoint";
import CausesIconOn from "./assets/causesIconOn.svg";
import ImpactIconOn from "./assets/impactIconOn.svg";
import ImpactIconOff from "./assets/impactIconOff.svg";
import CausesIconOff from "./assets/causesIconOff.svg";
import * as S from "./styles";

export type Props = {
  isImpactPage: boolean;
};
function Navigation(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.menu",
  });

  const { isDesktop } = useBreakpoint();

  const location = useLocation();
  const isImpactPage = ["/impact"].includes(location.pathname);
  const isCausesPage = ["/"].includes(location.pathname);

  const iconImpactPage = isImpactPage ? ImpactIconOn : ImpactIconOff;
  const iconCausesPage = isCausesPage ? CausesIconOn : CausesIconOff;

  return isDesktop ? (
    <S.ContainerDesktop>
      <S.StyledLink to="/">
        <S.Icon src={iconCausesPage} />
        <S.Title enabled={isCausesPage}>{t("causesPageTitle")}</S.Title>
      </S.StyledLink>
      <S.StyledLink to="/impact">
        <S.Icon src={iconImpactPage} />
        <S.Title enabled={isImpactPage}>{t("impactTitle")}</S.Title>
      </S.StyledLink>
    </S.ContainerDesktop>
  ) : (
    <S.ContainerMobile>
      <S.StyledLink to="/">
        <S.Icon src={iconCausesPage} />
        <S.Title enabled={isCausesPage}>{t("causesPageTitle")}</S.Title>
      </S.StyledLink>
      <S.StyledLink to="/impact">
        <S.Icon src={iconImpactPage} />
        <S.Title enabled={isImpactPage}>{t("impactTitle")}</S.Title>
      </S.StyledLink>
    </S.ContainerMobile>
  );
}

export default Navigation;
