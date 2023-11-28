import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { theme } from "@ribon.io/shared/styles";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import ticketImage from "assets/images/ticket-image.svg";
import { logEvent } from "lib/events";
import { NonProfit } from "@ribon.io/shared/types";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCurrentUser } from "contexts/currentUserContext";
import usePostTicketDonationNavigation from "hooks/usePostTicketDonationNavigation";
import * as S from "./styles";

function ExtraTicketPage(): JSX.Element {
  type LocationState = {
    nonProfit: NonProfit;
  };
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.extraTicketPage",
  });
  const { currentUser } = useCurrentUser();
  const { handleNavigate } = usePostTicketDonationNavigation();
  const {
    state: { nonProfit },
  } = useLocation<LocationState>();

  useEffect(() => {
    logEvent("P29_view", {
      from: "donation_flow",
    });
  }, []);

  const handleButtonPress = () => {
    logEvent("authRewardSkipBtn_click", {
      from: "donation_flow",
    });
    handleNavigate(nonProfit);
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

export default ExtraTicketPage;
