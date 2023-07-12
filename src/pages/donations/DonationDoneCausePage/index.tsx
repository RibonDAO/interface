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
import * as S from "./styles";

function DonationDoneCausePage(): JSX.Element {
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
      });
      navigateTo({
        pathname: "/promoters/support-cause",
        state: { nonProfit, cause },
      });
    }
    if (flow === "nonProfit") {
      registerAction("contribution_done_page_view");
      logEvent("ngoGave_end", {
        platform: "web",
      });
      navigateTo({
        pathname: "/promoters/support-non-profit",
        state: { nonProfit, cause },
      });
    }
    if (!hasButton) {
      registerAction("donation_done_page_view");

      if (shouldShowAppDownload()) {
        navigateTo({
          pathname: "/app-download",
          state: { nonProfit, showContribute: shouldShowContribute() },
        });
      } else if (!isLoading && shouldShowContribute()) {
        navigateTo({
          pathname: "/post-donation",
          state: { nonProfit, cause },
        });
      } else if (!isLoading && userStatistics) {
        navigateTo({
          pathname: "/causes",
        });
      }
    }
  }

  useEffect(() => {
    if (offerId) {
      donationInfos(offerId);
    }
    setLocalStorageItem("HAS_DONATED", "true");
    setPageTimeout(
      setTimeout(() => {
        navigate();
      }, 2500),
    );
  }, [currentUser, userStatistics]);

  const colorTheme = getThemeByFlow(flow || "cause");

  const bottomText = () => {
    if (flow === "cause" && hasButton) return cause?.name;
    if (flow === "nonProfit" && hasButton) return nonProfit?.name;

    return formattedImpactText(nonProfit);
  };

  const audio = getAudioFromStorage("donationDoneSound");

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
