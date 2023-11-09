import useQueryParams from "hooks/useQueryParams";
import Icon from "components/atomics/Icon";
import LogoFull from "assets/icons/logo-full.svg";
import TopRightShape from "assets/images/top-right-shape.svg";
import BottomLeftShape from "assets/images/bottom-left-shape.svg";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import ExpiredLinkLogo from "./assets/expired-link-logo.svg";
import * as S from "./styles";

function ExpiredLinkPage() {
  const queryParams = useQueryParams();
  const token = queryParams.get("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "expiredLinkPage",
  });

  const renderLoader = () => (
    <S.Container>
      <S.Loader />
      <p>{t("loading")}</p>
    </S.Container>
  );

  const renderInvalidLink = () => (
    <S.Container>
      <Icon name="error" size="50px" />
      <p>{t("invalidLink")}</p>
    </S.Container>
  );

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
