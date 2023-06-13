import LogoBackgroundIcon from "assets/icons/logo-background-icon.svg";
import { useTranslation } from "react-i18next";
import { ANDROID_APP_LINK, IOS_APP_LINK } from "utils/constants";
import * as S from "./styles";

function DownloadAppModalTemplate(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "downloadAppModalTemplate",
  });

  const handleClickedDownloadButton = () => {
    const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    const isAndroid = navigator.userAgent.match(/Android/i);

    if (isIOS) {
      window.open(IOS_APP_LINK, "_blank");
    } else if (isAndroid) {
      window.open(ANDROID_APP_LINK, "_blank");
    }
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
