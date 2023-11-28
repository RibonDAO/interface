import {
  useStatistics,
  useFirstAccessToIntegration,
  useUserConfig,
} from "@ribon.io/shared/hooks";
import ConfirmationNumberPink from "assets/icons/confirmation-number-pink.svg";
import ConfirmationNumberYellow from "assets/icons/confirmation-number-yellow.svg";
import ConfirmationNumberGreen from "assets/icons/confirmation-number-green.svg";
import useNavigation from "hooks/useNavigation";
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
import { useIntegrationId } from "hooks/useIntegrationId";
import usePostTicketDonationNavigation from "hooks/usePostTicketDonationNavigation";

import { logEvent } from "lib/events";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import IconsAroundImage from "components/atomics/sections/IconsAroundImage";
import * as S from "./styles";

function TicketDonationDonePage(): JSX.Element {
  useAvoidBackButton();
  type LocationState = {
    nonProfit: NonProfit;
    flow?: "nonProfit" | "login" | "magicLink";
    from?: string;
  };

  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.ticketDonationDonePage",
  });
  const { formattedImpactText } = useFormattedImpactText();

  const {
    state: { nonProfit, flow },
  } = useLocation<LocationState>();
  const [allowedEmailMarketing, setAllowedEmailMarketing] = useState(false);
  const { currentUser } = useCurrentUser();
  const { registerAction } = useTasksContext();
  const { userConfig, updateUserConfig } = useUserConfig();
  const { refetch: refetchUserConfig, config } = userConfig();
  const { handleNavigate } = usePostTicketDonationNavigation();

  const {
    userStatistics,
    refetch: refetchStatistics,
    isLoading,
  } = useStatistics({
    userId: currentUser?.id,
  });

  const integrationId = useIntegrationId();

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
        !config.allowedEmailMarketing
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

    if (flow === "magicLink") {
      navigateTo({
        pathname: "/extra-ticket",
        state: {
          nonProfit,
        },
      });
    } else if (!isLoading) {
      handleNavigate(nonProfit);
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

  const bottomText = formattedImpactText(nonProfit);

  const audio = getAudioFromStorage("donationDoneSound");

  const oldImpactFormat = () => (
    <>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("description")}</S.Subtitle>
      <S.ImpactDescription>{bottomText}</S.ImpactDescription>
    </>
  );

  const image =
    "https://ribon-core-api-production.s3.amazonaws.com/wwtniqmqa54koan6s3p1we7izl8y?response-content-disposition=inline%3B%20filename%3D%22Captura%20de%20Tela%202022-09-05%20a%253Fs%2010.37.14.jpg%22%3B%20filename%2A%3DUTF-8%27%27Captura%2520de%2520Tela%25202022-09-05%2520a%25CC%2580s%252010.37.14.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA42ZX7UC72NBLHNXM%2F20231128%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231128T141411Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=4ee61b8d6ae17c7fb4d3da0903b9e68da9fc70b447ab8fda0edd4aacc80027ac";
  const renderImpactValue = () => oldImpactFormat();

  return (
    <S.Container>
      {audio && <ReactHowler src={audio} loop={false} playing />}
      <S.ImageContainer>
        <IconsAroundImage
          isInfiniteAnimation={false}
          imageSrc={image}
          iconAnimationYellow={ConfirmationNumberYellow}
          iconAnimationPink={ConfirmationNumberPink}
          iconAnimationGreen={ConfirmationNumberGreen}
        />
      </S.ImageContainer>
      <S.ContentContainer>
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
        <S.FinishButton
          text={t("button")}
          onClick={() => {
            navigate();
          }}
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default TicketDonationDonePage;
