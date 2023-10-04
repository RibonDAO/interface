import IconsAroundImage from "components/atomics/sections/IconsAroundImage";
import {
  useCanDonate,
  useOffers,
  useStatistics,
  useFirstAccessToIntegration,
} from "@ribon.io/shared/hooks";
import VolunteerActivismPink from "assets/icons/volunteer-activism-pink.svg";
import VolunteerActivismYellow from "assets/icons/volunteer-activism-yellow.svg";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import ConfirmationNumberPink from "assets/icons/confirmation-number-pink.svg";
import ConfirmationNumberYellow from "assets/icons/confirmation-number-yellow.svg";
import ConfirmationNumberGreen from "assets/icons/confirmation-number-green.svg";
import useNavigation from "hooks/useNavigation";
import { setLocalStorageItem } from "lib/localStorage";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logError } from "services/crashReport";
import { Cause, NonProfit, Offer, Currencies } from "@ribon.io/shared/types";
import getThemeByFlow from "lib/themeByFlow";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { getAudioFromStorage } from "lib/cachedAudio";
import ReactHowler from "react-howler";
import { useTasksContext } from "contexts/tasksContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import { PLATFORM } from "utils/constants";
import extractUrlValue from "lib/extractUrlValue";
import { logEvent } from "lib/events";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useExperiment } from "@growthbook/growthbook-react";
import * as S from "./styles";

function DonationDoneCausePage(): JSX.Element {
  useAvoidBackButton();
  type LocationState = {
    offerId?: number;
    cause: Cause;
    hasButton?: boolean;
    nonProfit?: NonProfit;
    flow?: "cause" | "nonProfit";
  };

  const { navigateTo } = useNavigation();
  const [pageTimeout, setPageTimeout] = useState<any>(null);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneCausePage",
  });
  const { formattedImpactText } = useFormattedImpactText();
  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const ticketVariation = useExperiment({
    key: "ticket-impact-test",
    variations: [false, true],
  });

  const currency = Currencies.USD;
  const {
    state: { nonProfit, offerId, cause, hasButton, flow },
  } = useLocation<LocationState>();
  const { getOffer } = useOffers(currency);
  const [offer, setOffer] = useState<Offer>();
  const { currentUser } = useCurrentUser();
  const { registerAction } = useTasksContext();
  const {
    userStatistics,
    refetch: refetchStatistics,
    isLoading,
  } = useStatistics({
    userId: currentUser?.id,
  });

  const integrationId = useIntegrationId();
  const { search } = useLocation();
  const externalId = extractUrlValue("external_id", search);
  const { donateApp } = useCanDonate(integrationId, PLATFORM, externalId);

  const quantityOfDonationsToShowDownload = 3;
  const quantityOfDonationsToShowContribute = 5;

  const { refetch } = useFirstAccessToIntegration(integrationId);

  const firstDonation = 1;

  const shouldShowAppDownload = useCallback(() => {
    if (donateApp) return false;
    return (
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowDownload ===
        0 || Number(userStatistics?.totalTickets) === firstDonation,
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowDownload ===
        0 || Number(userStatistics?.totalTickets) === firstDonation
    );
  }, [userStatistics, donateApp]);
  const shouldShowContribute = useCallback(
    () =>
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowContribute ===
        0 || Number(userStatistics?.totalTickets) === firstDonation,
    [userStatistics],
  );

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
    clearTimeout(pageTimeout);
    refetch();
    if (flow === "cause" && hasButton) {
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
      });
      if (variation.value) {
        navigateTo("/impact");
      } else {
        navigateTo({
          pathname: offer?.subscription
            ? "monthly-contributions"
            : "/promoters/support-non-profit",
          state: { nonProfit, cause, from: "donation-done-cause" },
        });
      }
    }
    if (!hasButton) {
      registerAction("donation_done_page_view");

      if (variation.value) {
        navigateTo("/impact");
      } else if (shouldShowAppDownload()) {
        navigateTo({
          pathname: "/app-download",
          state: { nonProfit, showContribute: shouldShowContribute() },
        });
      } else if (!isLoading && shouldShowContribute()) {
        navigateTo({
          pathname: "/post-donation",
          state: { nonProfit, cause },
        });
      } else {
        navigateTo({
          pathname: "/causes",
          state: { cause },
        });
      }
    }
  }

  useEffect(() => {
    if (offerId) {
      donationInfos(offerId);
    }
    setLocalStorageItem("HAS_DONATED", "true");
    const timeout = setTimeout(() => {
      navigate();
    }, 2500);
    setPageTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentUser, userStatistics]);

  const colorTheme = getThemeByFlow(flow || "free");

  const bottomText = () => {
    if (flow === "cause" && hasButton) return cause?.name;
    if (flow === "nonProfit" && hasButton) return nonProfit?.name;

    return formattedImpactText(nonProfit);
  };

  const audio = getAudioFromStorage("donationDoneSound");

  const oldImpactFormat = () => (
    <>
      <S.DonationValue color={colorTheme.shade20}>
        {hasButton ? offer?.price : t("title")}
      </S.DonationValue>
      {hasButton && <S.PostDonationText>{t("title")}</S.PostDonationText>}
      <S.PostDonationText>
        {hasButton ? t("titleSecondLine") : t("youDonatedText")}
        <S.CauseName
          isGreen={!!nonProfit && !hasButton}
          color={colorTheme.shade20}
        >
          {" "}
          {bottomText()}{" "}
        </S.CauseName>
      </S.PostDonationText>
    </>
  );

  const newImpactFormat = () => (
    <>
      <S.DonationValue color={colorTheme.shade40}>{t("title")}</S.DonationValue>
      <S.ThanksToYou>{t("thanksToYou")}</S.ThanksToYou>
      <S.ImpactAmount color={colorTheme.shade40}>
        {offerId
          ? t("livesWereImpacted", {
              value: Math.round((offer?.priceValue ?? 0) * 2),
            })
          : t("lifeWasImpacted")}
      </S.ImpactAmount>
      {nonProfit?.impactDescription && (
        <S.ImpactDescription color={colorTheme.shade40} hasButton>
          {t("impactDescription", {
            value: nonProfit?.impactDescription.split(",")[0],
          })}
        </S.ImpactDescription>
      )}
    </>
  );

  const newTicketFormat = () => (
    <>
      <S.DonationValue color={colorTheme.shade40}>
        {offerId
          ? t("ticketsWereDonated", {
              value: Math.round((offer?.priceValue ?? 0) * 2),
            })
          : t("ticketWasDonated")}
      </S.DonationValue>
      <S.ThanksToYou>{t("thanksToYou")}</S.ThanksToYou>
      <S.ImpactAmount color={colorTheme.shade40}>
        {offerId
          ? t("livesWereImpacted", {
              value: Math.round((offer?.priceValue ?? 0) * 2),
            })
          : t("lifeWasImpacted")}
      </S.ImpactAmount>
      {nonProfit?.impactDescription && (
        <S.ImpactDescription color={colorTheme.shade40} hasButton>
          {t("impactDescription", {
            value: nonProfit?.impactDescription.split(",")[0],
          })}
        </S.ImpactDescription>
      )}
    </>
  );

  const renderImpactValue = () => {
    if (variation.value) {
      return newImpactFormat();
    } else if (ticketVariation.value) {
      return newTicketFormat();
    }

    return oldImpactFormat();
  };

  return (
    <S.Container>
      {audio && !hasButton && <ReactHowler src={audio} loop={false} playing />}
      <S.ImageContainer>
        <IconsAroundImage
          imageSrc={
            flow === "cause" ? cause?.mainImage : nonProfit?.confirmationImage
          }
          iconAnimationYellow={
            hasButton ? VolunteerActivismYellow : ConfirmationNumberYellow
          }
          iconAnimationPink={
            hasButton ? VolunteerActivismPink : ConfirmationNumberPink
          }
          iconAnimationGreen={
            hasButton ? VolunteerActivismGreen : ConfirmationNumberGreen
          }
        />
      </S.ImageContainer>
      {renderImpactValue()}
      {hasButton && (
        <S.FinishButton
          text={t("button")}
          onClick={() => {
            navigate();
          }}
          background={colorTheme.shade20}
        />
      )}
    </S.Container>
  );
}

export default DonationDoneCausePage;
