import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared";
import { useEffect } from "react";
import { newLogEvent } from "lib/events";
import * as S from "./styles";
import IllustrationMobile from "./assets/illustration-mobile.svg";
import LeftImage from "./assets/left-image.svg";
import RightImage from "./assets/right-image.svg";
import AppDownloadTemplate from "./AppDownloadTemplate";

type LocationStateType = {
  nonProfit: NonProfit;
  showContribute: boolean;
};

function AppDownloadPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const {
    state: { nonProfit, showContribute },
  } = useLocation<LocationStateType>();

  const { navigateBack } = useNavigation();
  const { navigateTo } = useNavigation();

  const comesFromPostDonation = !!nonProfit;

  const handleOnClickSecondButton = () => {
    if (comesFromPostDonation) {
      if (showContribute)
        navigateTo({
          pathname: "/post-donation",
          state: { nonProfit },
        });
      else
        navigateTo({
          pathname: "/causes",
        });
    } else {
      navigateBack();
    }
  };

  const handleOnClickFirstButton = () => {
    if (comesFromPostDonation)
      newLogEvent("click", "webDwnldCta", { from: "postDonation" });
  };

  useEffect(() => {
    if (comesFromPostDonation)
      newLogEvent("view", "webDwnldCta", { from: "postDonation" });
  }, []);

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />

      <S.Container>
        {!comesFromPostDonation && (
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
            onClick: () => handleOnClickFirstButton(),
          }}
          secondButton={{
            text: nonProfit ? t("buttonSkip") : t("buttonBack"),
            onClick: () => handleOnClickSecondButton(),
          }}
          hasBackButton
          spacingTopDonationFlow={comesFromPostDonation}
        />
      </S.Container>
    </S.Container>
  );
}

export default AppDownloadPage;
