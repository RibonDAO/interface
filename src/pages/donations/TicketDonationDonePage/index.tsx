import {
  useStatistics,
  useFirstAccessToIntegration,
  useUserConfig,
  useUserProfile,
} from "@ribon.io/shared/hooks";
import { setLocalStorageItem } from "lib/localStorage";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared/types";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { getAudioFromStorage } from "lib/cachedAudio";
import ReactHowler from "react-howler";
import { useTasksContext } from "contexts/tasksContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import ImageWithIconOverlay from "components/atomics/ImageWithIconOverlay";
import greenSun from "assets/images/green-sun.svg";
import CardImageImagePlaceholder from "./ImagePlaceholder";
import * as S from "./styles";

function TicketDonationDonePage(): JSX.Element {
  useAvoidBackButton();
  type LocationState = {
    nonProfit: NonProfit;
    flow?: "nonProfit" | "login" | "magicLink";
    from?: string;
    impact?: number;
  };

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.ticketDonationDonePage",
  });
  const { formattedImpactText } = useFormattedImpactText();

  const {
    state: { nonProfit, impact },
  } = useLocation<LocationState>();
  const [allowedEmailMarketing, setAllowedEmailMarketing] = useState(false);
  const [isCardImageLoading, setIsCardImageLoading] = useState(true);
  const { currentUser } = useCurrentUser();
  const { registerAction } = useTasksContext();
  const { userConfig, updateUserConfig } = useUserConfig();
  const { refetch: refetchUserConfig, config } = userConfig();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const { navigateTo } = useNavigation();

  const {
    userStatistics,
    refetch: refetchStatistics,
    isLoading,
  } = useStatistics({
    userId: currentUser?.id,
  });

  const { currentIntegrationId: integrationId } = useIntegrationContext();

  const quantityOfDonationsToShowEmailCheckbox = 3;
  const firstDonation = 1;

  const { refetch } = useFirstAccessToIntegration(integrationId);

  const shouldShowEmailCheckbox = useCallback(() => {
    if (userStatistics && config) {
      return (
        (Number(userStatistics.totalTickets) <=
          quantityOfDonationsToShowEmailCheckbox ||
          Number(userStatistics.totalTickets) %
            quantityOfDonationsToShowEmailCheckbox ===
            0 ||
          Number(userStatistics.totalTickets) === firstDonation) &&
        config.allowedEmailMarketing
      );
    }
    return false;
  }, [userStatistics, config]);

  useEffect(() => {
    refetchStatistics();
    refetchUserConfig();
  }, [currentUser]);

  function navigate() {
    refetch();

    registerAction("donation_done_page_view");

    if (allowedEmailMarketing && currentUser) {
      logEvent("acceptReceiveEmail_click", {
        from: "confirmedDonation_page",
      });
      updateUserConfig(currentUser.id, { allowedEmailMarketing });
    }

    if (!isLoading) {
      navigateTo("/post-donation");
    }
  }

  useEffect(() => {
    setLocalStorageItem("HAS_DONATED", "true");
  }, [currentUser, userStatistics]);

  useEffect(() => {
    if (shouldShowEmailCheckbox()) {
      logEvent("acceptReceiveEmail_view", {
        from: "confirmedDonation_page",
      });
    }
  }, []);

  const bottomText = formattedImpactText(nonProfit, impact);

  const audio = getAudioFromStorage("donationDoneSound");

  const oldImpactFormat = () => (
    <>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("description")}</S.Subtitle>
      <S.ImpactDescription>{bottomText}</S.ImpactDescription>
    </>
  );

  const renderImpactValue = () => oldImpactFormat();

  return (
    <S.Container>
      <S.MainContainer>
        {audio && <ReactHowler src={audio} loop={false} playing />}
        <S.TopContainer>
          {nonProfit?.confirmationImage && isCardImageLoading && (
            <CardImageImagePlaceholder />
          )}
          <S.CardImage
            src={nonProfit?.confirmationImage}
            onLoad={() => setIsCardImageLoading(false)}
          />
          <S.ImageWithIconOverlayContainer>
            <ImageWithIconOverlay
              leftImage={profile?.photo}
              rightImage={nonProfit?.icon}
            />
          </S.ImageWithIconOverlayContainer>
        </S.TopContainer>

        <S.TextContainer>
          {renderImpactValue()}
          {shouldShowEmailCheckbox() && (
            <S.CheckboxContainer>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  onChange={(e) =>
                    setAllowedEmailMarketing(e.currentTarget.checked)
                  }
                />
                {t("checkboxText")}
              </S.CheckboxLabel>
            </S.CheckboxContainer>
          )}
        </S.TextContainer>

        <S.ButtonContainer>
          <S.FinishButton
            text={t("button")}
            onClick={() => {
              navigate();
            }}
          />
        </S.ButtonContainer>
      </S.MainContainer>
      <S.BackgroundSun>
        <S.sunAnimation src={greenSun} />
      </S.BackgroundSun>
    </S.Container>
  );
}

export default TicketDonationDonePage;
