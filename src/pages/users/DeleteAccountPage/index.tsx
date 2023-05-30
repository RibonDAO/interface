import useQueryParams from "hooks/useQueryParams";
import Icon from "components/atomics/Icon";
import MobileWithBin from "assets/images/mobile-with-bin.svg";
import LogoFull from "assets/icons/logo-full.svg";
import TopRightShape from "assets/images/top-right-shape.svg";
import BottomLeftShape from "assets/images/bottom-left-shape.svg";
import { useUsers } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import * as S from "./styles";

function DeleteAccountPage() {
  const queryParams = useQueryParams();
  const token = queryParams.get("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "deleteAccountPage",
  });

  const { deleteUser } = useUsers();

  const callTheApi = useCallback(() => {
    if (!token) return;

    deleteUser(token)
      .then((deleted) => {
        setLoading(false);
        if (!deleted) setError(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [token, deleteUser]);

  useEffect(() => {
    if (loading) callTheApi();
  }, [callTheApi, loading]);

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

  if (!token) return renderInvalidLink();
  if (error && !loading) return renderInvalidLink();
  if (loading) return renderLoader();

  return (
    <S.Container>
      <S.TopRightShape src={TopRightShape} aria-hidden="true" />
      <S.BottomLeftShape src={BottomLeftShape} aria-hidden="true" />
      <S.Logo src={LogoFull} aria-hidden="true" />
      <S.Image src={MobileWithBin} aria-hidden="true" />
      <S.Title>{t("accountDeleted")}</S.Title>
      <S.Description>{t("accountDeletedText")}</S.Description>
    </S.Container>
  );
}

export default DeleteAccountPage;
