import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared/types";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useEffect, useState } from "react";
import { logEvent } from "@amplitude/analytics-browser";
import theme from "styles/theme";
import IllustrationMobile from "assets/images/extra-ticket.svg";
import * as S from "./styles";
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
  }, []);

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

  useEffect(() => {
    logEvent("P17_view");
  });

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
          firstButton={{
            text: t("buttonDownloadApp"),
            backgroundColor: theme.colors.brand.primary[600],
            textColor: theme.colors.neutral10,
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
