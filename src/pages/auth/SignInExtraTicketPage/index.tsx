import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import ticketImage from "assets/images/ticket-image.svg";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCurrentUser } from "contexts/currentUserContext";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import { userAccountApi } from "@ribon.io/shared/services";
import useToast from "hooks/useToast";
import { useAuthentication } from "contexts/authenticationContext";
import * as S from "./styles";

function SignInExtraTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInExtraTicketPage",
  });
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { sendAuthenticationEmail } = useAuthentication();
  const toast = useToast();

  useEffect(() => {
    logEvent("P29_view", {
      from: "donation_flow",
    });
  }, []);

  const onContinue = async (pathname: string) => {
    await userAccountApi.postSendValidatedEmail();
    navigateTo({
      pathname,
    });
    toast({
      message: t("toastDescription"),
      type: "success",
    });
  };

  const onContinueMagicLink = (pathname: string) => {
    sendAuthenticationEmail({ email: currentUser?.email });
    navigateTo({
      pathname,
    });
  };

  useAvoidBackButton();

  return (
    <S.Container>
      <S.MainContainer>
        <S.RightImage src={RightImage} />
        <S.LeftImage src={LeftImage} />
        <S.ContentContainer>
          <S.Image src={ticketImage} />
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Description>
              {t("description", { email: currentUser?.email })}
            </S.Description>
          </S.TextContainer>

          <S.ButtonContainer>
            <GoogleLogin
              onContinue={() => onContinue("/")}
              from="donation_flow"
            />
            <AppleLogin
              onContinue={() => onContinue("/")}
              from="donation_flow"
            />
            <MagicLinkLogin
              onContinue={() =>
                onContinueMagicLink("/auth/sent-magic-link-email")
              }
              from="donation_flow"
            />
          </S.ButtonContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default SignInExtraTicketPage;
