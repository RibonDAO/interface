import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";
import IllustrationMobile from "./assets/illustration-mobile.svg";
import LeftImage from "./assets/left-image.svg";
import RightImage from "./assets/right-image.svg";
import AppDownloadSection from "../AppDownloadSection";

function AppDownloadPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const { navigateBack } = useNavigation();

  const handleGoBack = () => {
    navigateBack();
  };

  return (
    <>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />

      <S.Container>
        <S.LeftArrow
          src={LeftArrow}
          alt="back-arrow-button"
          onClick={() => handleGoBack()}
        />
        <AppDownloadSection
          title={t("title")}
          image={IllustrationMobile}
          description={t("description")}
          firstButton={{
            text: t("buttonDownloadApp"),
          }}
          secondButton={{
            text: t("button"),
            onClick: () => handleGoBack(),
          }}
          hasBackButton
        />
      </S.Container>
    </>
  );
}

export default AppDownloadPage;
