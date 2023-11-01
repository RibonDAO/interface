import React, { useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import BackgroundShapes from "assets/images/background-shapes.svg";
import { isValidEmail } from "lib/validators";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onContinue: (email: string, allowedEmailMarketing?: boolean) => void;
  allowedEmailMarketing?: boolean;
};
function MagicLinkSection({
  nonProfit,
  onContinue,
  allowedEmailMarketing,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.confirmDonationPage.MagicLinkSection",
  });

  const [email, setEmail] = useState("");

  const { formattedImpactText } = useFormattedImpactText();

  useEffect(() => {
    logEvent("P12_view", {
      nonProfitId: nonProfit.id,
    });
  }, []);

  const handleButtonPress = () => {
    onContinue(email, allowedEmailMarketing);
  };

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

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
        <S.Input
          name="email"
          id="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <S.Button
          text={t("confirmText")}
          onClick={handleButtonPress}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          textColor={theme.colors.neutral[25]}
          disabled={!isValidEmail(email)}
          eventName="P12_continueBtn"
          eventParams={{ nonProfitId: nonProfit.id }}
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default MagicLinkSection;
