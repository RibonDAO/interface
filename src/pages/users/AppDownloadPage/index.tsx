import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared/types";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
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
  cameFrom?: string;
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

  const handleBackNavigation = () => {
    const path = state?.cameFrom === "intro" ? "/intro" : "/impact";

    navigateTo(path);
  };

  const handleOnClickSecondButton = () => {
    if (comesFromPostDonation && showContribute) {
      navigateTo({
        pathname: "/post-donation",
        state: { nonProfit },
      });
    } else {
      handleBackNavigation();
    }
  };

  useEffect(() => {
    const from = comesFromPostDonation ? "postDonation" : "downloadPage";
    logEvent("P17_view");
    const utmParams = getUTMFromLocationSearch(window.location.search);

    logEvent("downloadCTA_view", {
      from,
      utm_source: utmParams.utmSource,
      utm_medium: utmParams.utmMedium,
      utm_campaign: utmParams.utmCampaign,
    });
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
