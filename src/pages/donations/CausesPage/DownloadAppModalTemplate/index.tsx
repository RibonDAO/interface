import LogoBackgroundIcon from "assets/icons/logo-background-icon.svg";
import { useTranslation } from "react-i18next";
import { APP_LINK } from "utils/constants";
import * as S from "./styles";

function DownloadAppModalTemplate(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "downloadAppModalTemplate",
  });

  const handleClickedDownloadButton = () => {
    window.open(APP_LINK, "_blank");
  };

  return (
    <S.Container>
      <S.Logo src={LogoBackgroundIcon} />
      <S.Title>{t("title")}</S.Title>
      <S.Description>{t("description")}</S.Description>
      <S.DownloadButton
        text={t("button")}
        onClick={handleClickedDownloadButton}
      />
    </S.Container>
  );
}

export default DownloadAppModalTemplate;
