import React, { useEffect } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import BackgroundShapes from "assets/images/background-shapes.svg";
import { useCurrentUser } from "contexts/currentUserContext";
import { newLogEvent } from "lib/events";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onContinue: (email: string) => void;
};
function SignedInSection({ nonProfit, onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.confirmDonationPage.signedInSection",
  });
  const { formattedImpactText } = useFormattedImpactText();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    newLogEvent("view", "P1_donateConfirmModal");
  }, []);

  const handleButtonPress = () => {
    if (currentUser) onContinue(currentUser.email);
  };

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
        <S.Description>
          {formattedImpactText(nonProfit, undefined, false, true)}
        </S.Description>
        <S.Button
          text={t("confirmText")}
          onClick={handleButtonPress}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          textColor={theme.colors.neutral[25]}
          eventName="P1_donateConfirmBtn"
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default SignedInSection;
