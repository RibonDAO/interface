import { useEffect } from "react";
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
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import { useCurrentUser } from "contexts/currentUserContext";
import NavigationBackHeader from "config/routes/Navigation/NavigationBackHeader";
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

  const { currentUser } = useCurrentUser();

  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const onContinueMagicLink = () => {
    navigateTo({
      pathname: "/insert-email",
      state: { nonProfit },
    });
  };

  useEffect(() => {
    logEvent("P27_view", {
      nonProfitId: nonProfit.id,
      from: "donation_flow",
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigateTo({ pathname: "/select-tickets", state: { nonProfit } });
    }
  }, [currentUser]);

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, false);

  return (
    <>
      <NavigationBackHeader />
      <S.RightImage src={RightImage} />
      <S.LeftImage src={LeftImage} />
      <S.Container>
        <S.ImageContainer>
          <S.Icon src={nonProfit.icon} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>
            {t("prefix")} {oldImpactFormat()}
          </S.Description>
          <S.ButtonContainer>
            <GoogleLogin from="donation_flow" />
            <AppleLogin from="donation_flow" />
            <MagicLinkLogin
              onContinue={onContinueMagicLink}
              from="donation_flow"
            />
          </S.ButtonContainer>
          <S.FooterText>
            {t("footerStartText")}
            {"  "}
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
