import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import ticketImage from "assets/images/ticket-image.svg";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

function SignInExtraTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.SignInExtraTicketPage",
  });
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("P29_view", {
      from: "donation_flow",
    });
  }, []);

  const handleButtonPress = () => {
    logEvent("authRewardSkipBtn_click", {
      from: "donation_flow",
    });
    navigateTo({
      pathname: "/causes",
    });
  };

  useAvoidBackButton();

  return (
    <S.Container>
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.Image src={ticketImage} />
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Description>
              {t("description", { email: currentUser?.email })}
            </S.Description>
          </S.TextContainer>
          <S.Button
            text={t("buttonText")}
            onClick={handleButtonPress}
            backgroundColor={theme.colors.neutral10}
            borderColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.brand.primary[600]}
            eventName="authRewardSkipBtn_click"
            eventParams={{ from: "donation_flow" }}
          />
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default SignInExtraTicketPage;
