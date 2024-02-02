import { useTranslation } from "react-i18next";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import ForYouMenu from "./ForYouMenu";
import * as S from "./styles";

function ForYouPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage",
  });

  return (
    <S.Container>
      <DownloadAppToast />
      <S.Title>{t("title")}</S.Title>
      <ForYouMenu />
    </S.Container>
  );
}

export default ForYouPage;
