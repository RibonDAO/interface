import React, { useEffect } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import BackgroundShapes from "assets/images/background-shapes.svg";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useExperiment } from "@growthbook/growthbook-react";
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
    logEvent("P13_view");
  }, []);

  const handleButtonPress = () => {
    if (currentUser) onContinue(currentUser.email);
  };

  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  const newImpactFormat = () => (
    <S.NewImpactContainer>
      <S.NewImpactTitle>{t("impactOneLife")}</S.NewImpactTitle>
      <S.NewImpactDescription>
        {t("impactDescription", {
          value: nonProfit.impactDescription.split(",")[0],
        })}
      </S.NewImpactDescription>
    </S.NewImpactContainer>
  );

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
          {variation.value ? newImpactFormat() : oldImpactFormat()}
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
