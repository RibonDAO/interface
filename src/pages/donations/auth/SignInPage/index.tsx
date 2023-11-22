import React, { useCallback, useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import useUserDonation from "hooks/useUserDonation";
import { useLocation } from "react-router";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import * as S from "./styles";
import DonatingSection from "../DonatingSection";

type LocationStateType = {
  nonProfit: NonProfit;
};
function SignInPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInPage",
  });

  const { formattedImpactText } = useFormattedImpactText();
  const { navigateTo } = useNavigation();

  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(false);

  const { handleDonate } = useUserDonation();
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const onContinue = async () => {
    setDonationInProgress(true);
    await handleDonate({
      nonProfit,
      onSuccess: () => setDonationSucceeded(true),
      onError: () => {
        setDonationSucceeded(false);
      },
    });
  };

  const onContinueMagicLink = () => {
    navigateTo({
      pathname: "/insert-email",
      state: { nonProfit },
    });
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      logEvent("ticketDonated_end", {
        nonProfitId: nonProfit.id,
      });
      navigateTo({
        pathname: "/donation-done-cause",
        state: {
          cause: nonProfit.cause,
          nonProfit,
          hasButton: true,
          hasCheckbox: true,
          flow: "login",
        },
      });
    }
  }, [donationSucceeded]);

  useEffect(() => {
    logEvent("P27_view", {
      nonProfitId: nonProfit.id,
      from: "donation_flow",
    });
  }, []);

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  return donationInProgress ? (
    <DonatingSection nonProfit={nonProfit} onAnimationEnd={onAnimationEnd} />
  ) : (
    <>
      <S.RightImage src={RightImage} />
      <S.Container>
        <S.LeftImage src={LeftImage} />
        <S.ImageContainer>
          <S.MainImage src={nonProfit.mainImage} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{oldImpactFormat()}</S.Description>
          <S.ButtonContainer>
            <GoogleLogin onContinue={onContinue} />
            <AppleLogin onContinue={onContinue} />
            <MagicLinkLogin onContinue={onContinueMagicLink} />
          </S.ButtonContainer>

          <S.FooterText>
            {t("footerStartText")}{" "}
            <a href={t("termsLink")} target="_blank" rel="noreferrer">
              {t("termsText")}
            </a>
            {t("footerEndText")}{" "}
            <a href={t("privacyPolicyLink")} target="_blank" rel="noreferrer">
              {t("privacyPolicyText")}
            </a>
          </S.FooterText>
        </S.ContentContainer>
      </S.Container>
    </>
  );
}

export default SignInPage;
