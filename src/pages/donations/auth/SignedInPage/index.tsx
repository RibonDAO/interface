import React, { useCallback, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import BackgroundShapes from "assets/images/background-shapes.svg";
import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useDonationFlow from "hooks/useDonationFlow";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { useLocation } from "react-router";
import { useTicketsContext } from "contexts/ticketsContext";
import * as S from "./styles";
import DonatingSection from "../DonatingSection";

type LocationStateType = {
  nonProfit: NonProfit;
};
function SignedInPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signedInPage",
  });

  const { formattedImpactText } = useFormattedImpactText();
  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(false);
  const { currentUser } = useCurrentUser();
  const { handleDonate } = useDonationFlow();
  const { setTicketsCounter } = useTicketsContext();
  const { navigateTo } = useNavigation();
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  const onContinue = async (email: string, allowedEmailMarketing?: boolean) => {
    setDonationInProgress(true);
    await handleDonate({
      nonProfit,
      email,
      allowedEmailMarketing,
      onSuccess: () => setDonationSucceeded(true),
      onError: () => {
        setDonationSucceeded(false);
      },
    });
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      setTicketsCounter(0);
      logEvent("ticketDonated_end", {
        nonProfitId: nonProfit.id,
      });
      navigateTo({
        pathname: "/ticket-donation-done",
        state: {
          flow: "signedIn",
          cause: nonProfit.cause,
          nonProfit,
        },
      });
    }
  }, [donationSucceeded]);

  const handleButtonPress = () => {
    if (currentUser) onContinue(currentUser.email);
  };

  return donationInProgress ? (
    <DonatingSection nonProfit={nonProfit} onAnimationEnd={onAnimationEnd} />
  ) : (
    <S.Container>
      <S.ImageContainer>
        <S.ImageBackground>
          <S.BackgroundShapes src={BackgroundShapes} />
        </S.ImageBackground>
        <S.MainImage src={nonProfit.mainImage} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Description>{oldImpactFormat()}</S.Description>
        <S.Button
          text={t("confirmText")}
          onClick={handleButtonPress}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          textColor={theme.colors.neutral[25]}
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default SignedInPage;
