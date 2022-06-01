import Loader from "components/atomics/Loader";
import Divider from "components/atomics/Divider";
import CardRoundImage from "components/moleculars/cards/CardRoundImage";
import { useTranslation } from "react-i18next";
import { today } from "lib/dateTodayFormatter";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "services/analytics";
import NonProfit from "types/entities/NonProfit";
import theme from "styles/theme";
import useDonations from "hooks/apiHooks/useDonations";
import { logError } from "services/crashReport";
import Integration from "types/entities/Integration";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
  integration: Integration;
};

function DonationInProcessPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationInProcess",
  });
  const { navigateTo } = useNavigation();
  const {
    state: { nonProfit, integration },
  } = useLocation<LocationStateType>();
  const { donate } = useDonations();
  const { currentUser, setUserLastDonation } = useCurrentUser();

  function saveLastDonation() {
    setUserLastDonation(today());
  }

  async function handleDonation() {
    if (!currentUser) return;

    try {
      await donate(integration?.id, nonProfit.id, currentUser.email);
      navigateTo({ pathname: "/donation-done", state: { nonProfit } });
      saveLastDonation();
    } catch (e: any) {
      const state =
        e.response.status === 403
          ? { blockedDonation: true }
          : { failedDonation: true };
      navigateTo({ pathname: "/", state });
      logError(e);
    }
  }

  useEffect(() => {
    logEvent("donateSendingDonation_view", { selected: nonProfit?.id });
    handleDonation();
  }, []);

  return (
    <S.Container>
      <CardRoundImage
        image={nonProfit?.backgroundImage}
        logo={nonProfit?.logo}
      />
      <S.AnimationContainer>
        <S.LoaderContainer>
          <Loader width={30} height={30} />
          <S.AnimationText>{t("animationText")}</S.AnimationText>
        </S.LoaderContainer>
        <S.DividerContainer>
          <Divider color={theme.colors.ribonBlack} width="48px" />
        </S.DividerContainer>
        <S.ImpactText>{t("impactText")}</S.ImpactText>
      </S.AnimationContainer>
    </S.Container>
  );
}

export default DonationInProcessPage;
