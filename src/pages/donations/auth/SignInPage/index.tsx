import React, { useCallback, useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import useDonationFlow from "hooks/useDonationFlow";
import { useTickets } from "hooks/useTickets";
import DonatingSection from "../DonatingSection";
import * as S from "./styles";

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
  const { handleDonate } = useDonationFlow();
  const { handleCollect } = useTickets();

  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

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

  const onContinue = async () => {
    setDonationInProgress(true);
    await handleCollect({
      onSuccess: () => {
        logEvent("ticketCollected", { from: "collect" });
      },
      onError: () => {
        setDonationSucceeded(false);
      },
    });
    await handleDonate({
      nonProfit,
      ticketsQuantity: 1,
      onSuccess: () => {
        logEvent("ticketDonated_end", {
          nonProfitId: nonProfit.id,
          quantity: 1,
        });
        setDonationSucceeded(true);
      },
      onError: (error) => {
        onDonationFail(error);
      },
    });
  };

  const onContinueSignInPage = () => {
    navigateTo({
      pathname: "/auth/sign-in",
      state: { nonProfit },
    });
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      navigateTo({
        pathname: "/ticket-donation-done",
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
      <S.LeftImage src={LeftImage} />
      <S.Container>
        <S.ImageContainer>
          <S.MainImage src={nonProfit.mainImage} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{oldImpactFormat()}</S.Description>
          <S.ButtonContainer>
            <GoogleLogin onContinue={onContinue} from="donation_flow" />
            <AppleLogin onContinue={onContinue} from="donation_flow" />
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
          <S.SignInContainer>
            <S.SignInTitle>{t("signInTitle")}</S.SignInTitle>
            <S.SignInButton onClick={onContinueSignInPage}>
              {t("signInButton")}
            </S.SignInButton>
          </S.SignInContainer>
        </S.ContentContainer>
      </S.Container>
    </>
  );
}

export default SignInPage;
