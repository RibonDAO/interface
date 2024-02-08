import IconsAroundImage from "components/atomics/sections/IconsAroundImage";
import {
  useOffers,
  useStatistics,
  useFirstAccessToIntegration,
} from "@ribon.io/shared/hooks";
import VolunteerActivismPink from "assets/icons/volunteer-activism-pink.svg";
import VolunteerActivismYellow from "assets/icons/volunteer-activism-yellow.svg";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import useNavigation from "hooks/useNavigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logError } from "services/crashReport";
import { Cause, NonProfit, Offer, Currencies } from "@ribon.io/shared/types";
import getThemeByFlow from "lib/themeByFlow";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTasksContext } from "contexts/tasksContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import { logEvent } from "lib/events";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import * as S from "./styles";

function ContributionDonePage(): JSX.Element {
  useAvoidBackButton();
  type LocationState = {
    offerId?: number;
    cause: Cause;
    nonProfit?: NonProfit;
    flow?: "cause" | "nonProfit";
    from?: string;
  };

  const { navigateTo } = useNavigation();
  const [pageTimeout, setPageTimeout] = useState<any>(null);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.contributionDonePage",
  });
  const { formattedImpactText } = useFormattedImpactText();

  const currency = Currencies.USD;
  const {
    state: { nonProfit, offerId, cause, flow, from },
  } = useLocation<LocationState>();
  const { getOffer } = useOffers(currency, false);
  const [offer, setOffer] = useState<Offer>();
  const { currentUser } = useCurrentUser();
  const { registerAction } = useTasksContext();
  const { userStatistics, refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });

  const integrationId = useIntegrationId();

  const { refetch } = useFirstAccessToIntegration(integrationId);

  useEffect(() => {
    refetchStatistics();
  }, [currentUser]);

  const donationInfos = useCallback(
    async (idOffer: number) => {
      try {
        if (idOffer !== 0) {
          const price = await getOffer(idOffer);
          setOffer(price);
        }
      } catch (e) {
        logError(e);
      }
    },
    [offerId],
  );

  function navigate() {
    refetch();
    if (flow === "cause") {
      registerAction("contribution_done_page_view");
      logEvent("causeGave_end", {
        platform: "web",
        currency: offer?.currency,
        amount: offer?.priceValue,
        causeId: cause.id,
      });
      navigateTo({
        pathname: offer?.subscription
          ? "monthly-contributions"
          : "/promoters/support-cause",
        state: { nonProfit, cause, from: "donation-done-cause" },
      });
    }

    if (flow === "nonProfit") {
      registerAction("contribution_done_page_view");
      logEvent("ngoGave_end", {
        platform: "web",
        currency: offer?.currency,
        amount: offer?.priceValue,
        nonProfitId: nonProfit?.id,
        from,
      });

      navigateTo({
        pathname: offer?.subscription
          ? "monthly-contributions"
          : "/promoters/support-non-profit",
        state: { nonProfit, cause, from: "donation-done-cause" },
      });
    }
  }

  useEffect(() => {
    if (offerId) {
      donationInfos(offerId);
    }
  }, [currentUser, userStatistics]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate();
    }, 2500);
    setPageTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    clearTimeout(pageTimeout);
  }, [pageTimeout]);

  const colorTheme = getThemeByFlow(flow || "free");

  const bottomText = () => {
    if (flow === "cause") return cause?.name;
    if (flow === "nonProfit") return nonProfit?.name;

    return formattedImpactText(nonProfit);
  };

  const oldImpactFormat = () => (
    <>
      <S.DonationValue color={colorTheme.shade20}>
        {offer?.price}
      </S.DonationValue>
      <S.PostDonationText>{t("title")}</S.PostDonationText>
      <S.PostDonationText>
        {t("titleSecondLine")}
        <S.CauseName color={colorTheme.shade20}> {bottomText()} </S.CauseName>
      </S.PostDonationText>
    </>
  );

  const renderImpactValue = () => oldImpactFormat();

  return (
    <S.Container>
      <S.ImageContainer>
        <IconsAroundImage
          imageSrc={
            flow === "cause" ? cause?.mainImage : nonProfit?.confirmationImage
          }
          iconAnimationYellow={VolunteerActivismYellow}
          iconAnimationPink={VolunteerActivismPink}
          iconAnimationGreen={VolunteerActivismGreen}
        />
      </S.ImageContainer>
      <S.ContentContainer>
        {renderImpactValue()}

        <S.FinishButton
          text={t("button")}
          onClick={() => {
            navigate();
          }}
          background={colorTheme.shade20}
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default ContributionDonePage;
