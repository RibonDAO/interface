import { useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { isValidEmail } from "lib/validators";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import { useAuthentication } from "contexts/authenticationContext";
import { useLocation } from "react-router";
import NavigationBackHeader from "config/routes/Navigation/NavigationBackHeader";
import Spinner from "components/atomics/Spinner";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};

function InsertEmailAccountPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.insertEmailAccountPage",
  });

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { formattedImpactText } = useFormattedImpactText();
  const { navigateTo } = useNavigation();
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const { sendAuthenticationEmail } = useAuthentication();

  const onContinue = async () => {
    setIsLoading(true);
    await sendAuthenticationEmail({ email });
    setTimeout(() => {
      navigateTo({ pathname: "/select-tickets", state: { nonProfit } });
    }, 1000);
  };

  useEffect(() => {
    if (nonProfit) {
      logEvent("P28_view", {
        nonProfitId: nonProfit.id,
        from: "donation_flow",
      });
    }
  }, [nonProfit]);

  const handleButtonPress = () => {
    logEvent("authEmailFormBtn_click", {
      nonProfitId: nonProfit.id,
      from: "donation_flow",
    });
    onContinue();
  };

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  if (isLoading)
    return (
      <S.LoaderContainer>
        <Spinner />
      </S.LoaderContainer>
    );
  return (
    <>
      <NavigationBackHeader />
      <S.Container>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ImageContainer>
          <S.Icon src={nonProfit.icon} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{oldImpactFormat()}</S.Description>
          <S.InputLabel htmlFor="email">{t("emailLabel")}</S.InputLabel>
          <S.Input
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
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
            eventName="authEmailFormBtn_click"
            eventParams={{ from: "donation_flow" }}
          />
        </S.ContentContainer>
      </S.Container>
    </>
  );
}

export default InsertEmailAccountPage;
