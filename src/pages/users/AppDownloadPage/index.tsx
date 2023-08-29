import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useEffect, useState } from "react";
import * as S from "./styles";
import IllustrationMobile from "./assets/illustration-mobile.svg";
import LeftImage from "./assets/left-image.svg";
import RightImage from "./assets/right-image.svg";
import AppDownloadTemplate from "./AppDownloadTemplate";

type LocationStateType = {
  nonProfit?: NonProfit;
  showContribute?: boolean;
};

function AppDownloadPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const [nonProfit, setNonProfit] = useState<NonProfit | undefined>();
  const [showContribute, setShowContribute] = useState<boolean | undefined>();

  const { state } = useLocation<LocationStateType>();
  useEffect(() => {
    if (state) {
      setNonProfit(state.nonProfit);
      setShowContribute(state.showContribute);
    }
  });

  const { navigateTo } = useNavigation();

  const comesFromPostDonation = !!nonProfit;

  const handleOnClickSecondButton = () => {
    if (comesFromPostDonation && showContribute) {
      navigateTo({
        pathname: "/post-donation",
        state: { nonProfit },
      });
    } else {
      navigateTo("/causes");
    }
  };

  useAvoidBackButton();

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
