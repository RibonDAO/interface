import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import TicketIconText from "components/moleculars/TicketIconText";
import SliderButton from "components/moleculars/sliders/SliderButton";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "@amplitude/analytics-browser";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router";
import { NonProfit } from "@ribon.io/shared/types";
import { useTicketsContext } from "contexts/ticketsContext";
import useDonationFlow from "hooks/useDonationFlow";
import DonatingSection from "../auth/DonatingSection";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};

export default function SelectTicketsPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.selectTicketsPage",
  });
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const { formattedImpactText } = useFormattedImpactText();
  const { signedIn } = useCurrentUser();
  const { handleDonate } = useDonationFlow();
  const { navigateTo } = useNavigation();
  const { ticketsCounter } = useTicketsContext();
  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const [currentImpact, setCurrentImpact] = useState(
    nonProfit?.impactByTicket || undefined,
  );

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    logEvent("ticketDonated_end", {
      nonProfitId: nonProfit.id,
      quantity: ticketsQuantity,
    });
  };

  const errorType = (type: number) => {
    switch (type) {
      case 403: {
        return "blockedDonation";
      }
      case 401: {
        return "unauthorizedDonation";
      }
      default: {
        return "failedDonation";
      }
    }
  };

  const onDonationFail = (error: any) => {
    const failedKey = errorType(error.response?.status);
    const newState = {
      [failedKey]: true,
      message: error.response?.data?.formatted_message || error.message,
    };
    setDonationSucceeded(false);
    navigateTo({ pathname: "/causes", state: newState });
  };

  const handleButtonPress = async () => {
    if (!signedIn) return;
    setDonationInProgress(true);

    await handleDonate({
      nonProfit,
      ticketsQuantity,
      onError: (error) => onDonationFail(error),
      onSuccess: onDonationSuccess,
    });
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      navigateTo({
        pathname: "/ticket-donation-done",
        state: {
          flow: "signedIn",
          cause: nonProfit.cause,
          nonProfit,
          impact: currentImpact,
        },
      });
    }
  }, [donationSucceeded, currentImpact]);

  useEffect(() => {
    setCurrentImpact(
      nonProfit?.impactByTicket
        ? nonProfit.impactByTicket * ticketsQuantity
        : undefined,
    );
  }, [nonProfit, ticketsQuantity]);

  return donationInProgress ? (
    <DonatingSection nonProfit={nonProfit} onAnimationEnd={onAnimationEnd} />
  ) : (
    <S.Container>
      <S.ImageContainer>
        <S.Image src={nonProfit?.mainImage} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Subtitle>
          {formattedImpactText(nonProfit, currentImpact, false, true)}
        </S.Subtitle>
        <TicketIconText quantity={ticketsQuantity} buttonDisabled />
        <SliderButton
          rangeSize={ticketsCounter}
          setValue={setTicketsQuantity}
        />
        <S.Button
          text={t("button")}
          textColor={theme.colors.neutral10}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.neutral[300]}
          onClick={handleButtonPress}
        />
      </S.ContentContainer>
    </S.Container>
  );
}
