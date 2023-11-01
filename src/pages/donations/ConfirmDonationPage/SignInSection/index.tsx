import React, { useEffect, useState } from "react";
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
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onContinue: (email: string, allowedEmailMarketing?: boolean) => void;
};
function SignInSection({ nonProfit, onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.confirmDonationPage.signInSection",
  });

  const { formattedImpactText } = useFormattedImpactText();
  const [allowedEmailMarketing, setAllowedEmailMarketing] = useState(false);
  const { navigateTo } = useNavigation();
  const { signInWithGoogle } = useAuthentication();

  useEffect(() => {
    logEvent("P12_view", {
      nonProfitId: nonProfit.id,
    });
  }, []);

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  const handleMagicLink = () => {
    navigateTo({
      pathname: "/donations/confirm-donation/magic-link",
      state: { nonProfit, allowedEmailMarketing },
    });
  };

  const handleGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      signInWithGoogle(tokenResponse);
    },
  });

  return (
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
          <Button
            text={t("apple")}
            textColor={theme.colors.neutral[600]}
            backgroundColor="transparent"
            borderColor={theme.colors.neutral[300]}
            leftIcon={AppleIcon}
          />
          <Button
            text={t("email")}
            textColor={theme.colors.neutral[600]}
            backgroundColor="transparent"
            borderColor={theme.colors.neutral[300]}
            onClick={() => handleMagicLink()}
          />
        </S.ButtonContainer>
        <S.CheckboxLabel>
          <S.Checkbox
            type="checkbox"
            onChange={(e) => setAllowedEmailMarketing(e.currentTarget.checked)}
          />
          {t("checkboxText")}
        </S.CheckboxLabel>

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
