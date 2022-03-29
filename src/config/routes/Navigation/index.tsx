import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import useBreakpoint from "hooks/useBreakpoint";
import { logEvent } from "services/analytics";
import CausesIconOn from "./assets/causesIconOn.svg";
import CausesIconOff from "./assets/causesIconOff.svg";
import ImpactIconOn from "./assets/impactIconOn.svg";
import ImpactIconOff from "./assets/impactIconOff.svg";
import FundIconOn from "./assets/fundIconOn.svg";
import FundIconOff from "./assets/fundIconOff.svg";
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
  const { search } = location;
  const isImpactPage = ["/impact"].includes(location.pathname);
  const isCausesPage = ["/"].includes(location.pathname);
  const isFundPage = ["/fund"].includes(location.pathname);

  const iconImpactPage = isImpactPage ? ImpactIconOn : ImpactIconOff;
  const iconCausesPage = isCausesPage ? CausesIconOn : CausesIconOff;
  const iconFundPage = isFundPage ? FundIconOn : FundIconOff;

  const handleEvent = () => {
    logEvent("fundNavBtn_click");
  };

  return isDesktop ? (
    <S.ContainerDesktop>
      <S.StyledLink to={{ pathname: "/", search }}>
        <S.Icon src={iconCausesPage} />
        <S.Title enabled={isCausesPage}>{t("causesPageTitle")}</S.Title>
      </S.StyledLink>
      <S.StyledLink onClick={handleEvent} to={{ pathname: "/fund", search }}>
        <S.Icon src={iconFundPage} />
        <S.Title enabled={isFundPage}>{t("fundPageTitle")}</S.Title>
      </S.StyledLink>
      <S.StyledLink to={{ pathname: "/impact", search }}>
        <S.Icon src={iconImpactPage} />
        <S.Title enabled={isImpactPage}>{t("impactPageTitle")}</S.Title>
      </S.StyledLink>
    </S.ContainerDesktop>
  ) : (
    <S.ContainerMobile>
      <S.StyledLink to={{ pathname: "/", search }}>
        <S.Icon src={iconCausesPage} />
        <S.Title enabled={isCausesPage}>{t("causesPageTitle")}</S.Title>
      </S.StyledLink>
      <S.StyledLink onClick={handleEvent} to={{ pathname: "/fund", search }}>
        <S.Icon src={iconFundPage} />
        <S.Title enabled={isFundPage}>{t("fundPageTitle")}</S.Title>
      </S.StyledLink>
      <S.StyledLink to={{ pathname: "/impact", search }}>
        <S.Icon src={iconImpactPage} />
        <S.Title enabled={isImpactPage}>{t("impactPageTitle")}</S.Title>
      </S.StyledLink>
    </S.ContainerMobile>
  );
}

export default Navigation;
