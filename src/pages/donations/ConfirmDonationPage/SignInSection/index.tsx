import React, { useCallback, useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import BackgroundShapes from "assets/images/background-shapes.svg";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import AppleIcon from "assets/icons/apple-icon.svg";
import GoogleIcon from "assets/icons/google-icon.svg";
import useNavigation from "hooks/useNavigation";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthentication } from "contexts/authenticationContext";
import AppleLogin from "react-apple-login";
import { APPLE_CLIENT_ID, APPLE_REDIRECT_URL } from "utils/constants";
import useUserDonation from "hooks/useUserDonation";
import * as S from "./styles";
import DonatingSection from "../DonatingSection";

type Props = {
  nonProfit: NonProfit;
};
function SignInSection({ nonProfit }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.confirmDonationPage.signInSection",
  });

  const { formattedImpactText } = useFormattedImpactText();
  const { navigateTo } = useNavigation();
  const { signInWithGoogle, signInWithApple } = useAuthentication();

  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(false);

  const { handleDonate } = useUserDonation();

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
          flow: "login",
        },
      });
    }
  }, [donationSucceeded]);

  useEffect(() => {
    logEvent("P27_view", {
      nonProfitId: nonProfit.id,
    });
  }, []);

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  const handleMagicLink = () => {
    logEvent("authEmailBtn_click", {
      from: "donation_flow",
    });
    navigateTo({
      pathname: `/donations/insert-email?nonProfitId=${nonProfit.id}`,
    });
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      await signInWithGoogle(tokenResponse);
      onContinue();
    },
  });

  function handleGoogle() {
    logEvent("authGoogleBtn_click", {
      from: "donation_flow",
    });
    loginGoogle();
  }

  const handleApple = async (response: any) => {
    logEvent("authAppleBtn_click", {
      from: "donation_flow",
    });
    if (!response.error) {
      await signInWithApple(response);
      onContinue();
    }
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
        <S.ButtonContainer>
          <Button
            text={t("google")}
            textColor={theme.colors.neutral[600]}
            backgroundColor="transparent"
            borderColor={theme.colors.neutral[300]}
            leftIcon={GoogleIcon}
            onClick={() => handleGoogle()}
          />
          <AppleLogin
            clientId={APPLE_CLIENT_ID}
            redirectURI={APPLE_REDIRECT_URL}
            usePopup
            callback={handleApple}
            responseMode="query"
            scope="name email"
            render={(renderProps) => (
              <Button
                text={t("apple")}
                textColor={theme.colors.neutral[600]}
                backgroundColor="transparent"
                borderColor={theme.colors.neutral[300]}
                leftIcon={AppleIcon}
                onClick={renderProps.onClick}
              />
            )}
          />
          <Button
            text={t("email")}
            textColor={theme.colors.neutral[600]}
            backgroundColor="transparent"
            borderColor={theme.colors.neutral[300]}
            onClick={() => handleMagicLink()}
          />
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
  );
}

export default SignInSection;
