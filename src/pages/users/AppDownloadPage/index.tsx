import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared";
import * as S from "./styles";
import IllustrationMobile from "./assets/illustration-mobile.svg";
import LeftImage from "./assets/left-image.svg";
import RightImage from "./assets/right-image.svg";
import AppDownloadTemplate from "./AppDownloadTemplate";

type LocationStateType = {
  nonProfit: NonProfit;
};

function AppDownloadPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const { navigateBack } = useNavigation();
  const { navigateTo } = useNavigation();

  const handleOnClickSecondButton = () => {
    if (nonProfit) {
      navigateTo({
        pathname: "/post-donation",
        state: { nonProfit },
      });
    } else {
      navigateBack();
    }
  };

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />

      <S.Container>
        {!nonProfit && (
          <S.LeftArrow
            src={LeftArrow}
            alt="back-arrow-button"
            onClick={() => handleOnClickSecondButton()}
          />
        )}
        <AppDownloadTemplate
          title={t("title")}
          image={IllustrationMobile}
          description={t("description")}
          firstButton={{
            text: t("buttonDownloadApp"),
          }}
          secondButton={{
            text: nonProfit ? t("buttonSkip") : t("buttonBack"),
            onClick: () => handleOnClickSecondButton(),
          }}
          hasBackButton
        />
      </S.Container>
    </S.Container>
  );
}

export default AppDownloadPage;
