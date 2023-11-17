import LogoFull from "assets/icons/logo-full.svg";
import TopRightShape from "assets/images/top-right-shape.svg";
import BottomLeftShape from "assets/images/bottom-left-shape.svg";
import { useTranslation } from "react-i18next";

import ExpiredLinkLogo from "./assets/expired-link-logo.svg";
import * as S from "./styles";

function ExpiredLinkPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "expiredLinkPage",
  });

  return (
    <S.Container>
      <S.TopRightShape src={TopRightShape} aria-hidden="true" />
      <S.BottomLeftShape src={BottomLeftShape} aria-hidden="true" />
      <S.Logo src={LogoFull} aria-hidden="true" />
      <S.Image src={ExpiredLinkLogo} aria-hidden="true" />
      <S.Title>{t("expiredLink")}</S.Title>
      <S.Description>{t("expiredLinkText")}</S.Description>
    </S.Container>
  );
}

export default ExpiredLinkPage;
