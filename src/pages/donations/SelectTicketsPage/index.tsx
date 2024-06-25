import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import TicketIconText from "components/moleculars/TicketIconText";
import SliderButton from "components/moleculars/sliders/SliderButton";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { logEvent } from "@amplitude/analytics-browser";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router";
import { NonProfit } from "@ribon.io/shared/types";
import { useTicketsContext } from "contexts/ticketsContext";
import useDonationFlow from "hooks/useDonationFlow";
import ImageWithIconOverlay from "components/atomics/ImageWithIconOverlay";
import NavigationBackHeader from "config/routes/Navigation/NavigationBackHeader";
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
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const [currentImpact, setCurrentImpact] = useState(
    nonProfit?.impactByTicket || undefined,
  );

  const [step, setStep] = useState<number | undefined>(undefined);
  const formattedImpact = formattedImpactText(
    nonProfit,
    currentImpact,
    false,
    false,
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

  useEffect(() => {
    logEvent("p40_view");
  }, []);

  useEffect(() => {
    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const lastImpact = impacts[nonProfitsImpactsLength - 1];
    if (lastImpact?.minimumNumberOfTickets) {
      setStep(lastImpact.minimumNumberOfTickets);
      setTicketsQuantity(lastImpact.minimumNumberOfTickets);
    }
  }, [nonProfit]);

  return donationInProgress ? (
    <DonatingSection
      nonProfit={nonProfit}
      onAnimationEnd={onAnimationEnd}
      shouldRepeatAnimation={donationInProgress && !donationSucceeded}
    />
  ) : (
    <S.Container>
      <NavigationBackHeader hasTicketCounter />

      <S.MainContainer>
        <S.ImageContainer>
          <ImageWithIconOverlay
            leftImage={profile?.photo}
            rightImage={nonProfit?.icon}
          />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Subtitle>
              {t("description")}
              {formattedImpact}
            </S.Subtitle>
          </S.TextContainer>
          <S.SliderContainer>
            <TicketIconText quantity={ticketsQuantity} buttonDisabled />
            {step && (
              <SliderButton
                rangeSize={ticketsCounter}
                setValue={setTicketsQuantity}
                step={step}
              />
            )}
          </S.SliderContainer>
          <S.Button
            text={
              ticketsQuantity > 1
                ? t("buttonPlural", { ticketsQuantity })
                : t("buttonSingular")
            }
            textColor={theme.colors.neutral10}
            backgroundColor={theme.colors.brand.primary[600]}
            borderColor={theme.colors.neutral[300]}
            onClick={handleButtonPress}
          />
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}
