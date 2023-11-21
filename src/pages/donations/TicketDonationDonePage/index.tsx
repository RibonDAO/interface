import {
  useCanDonate,
  useStatistics,
  useFirstAccessToIntegration,
  useUserV1Config,
} from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import { setLocalStorageItem } from "lib/localStorage";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Cause, NonProfit } from "@ribon.io/shared/types";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { getAudioFromStorage } from "lib/cachedAudio";
import ReactHowler from "react-howler";
import { useTasksContext } from "contexts/tasksContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import { PLATFORM } from "utils/constants";
import extractUrlValue from "lib/extractUrlValue";
import { logEvent } from "lib/events";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import * as S from "./styles";

function ticketDonationDonePage(): JSX.Element {
  useAvoidBackButton();
  type LocationState = {
    offerId?: number;
    cause: Cause;
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
    state: { nonProfit, cause, flow },
  } = useLocation<LocationState>();
  const [allowedEmailMarketing, setAllowedEmailMarketing] = useState(false);
  const { currentUser } = useCurrentUser();
  const { registerAction } = useTasksContext();
  const { updateUserConfig } = useUserV1Config();
  const {
    userStatistics,
    refetch: refetchStatistics,
    isLoading,
  } = useStatistics({
    userId: currentUser?.id,
  });

  const integrationId = useIntegrationId();
  const { search } = useLocation();
  const externalId = extractUrlValue("external_id", search);
  const { donateApp } = useCanDonate(integrationId, PLATFORM, externalId);

  const quantityOfDonationsToShowDownload = 3;
  const quantityOfDonationsToShowContribute = 5;
  const quantityOfDonationsToShowEmailCheckbox = 3;
  const firstDonation = 1;

  const { refetch } = useFirstAccessToIntegration(integrationId);

  const shouldShowAppDownload = useCallback(() => {
    if (donateApp) return false;
    return (
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowDownload ===
        0 || Number(userStatistics?.totalTickets) === firstDonation,
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowDownload ===
        0 || Number(userStatistics?.totalTickets) === firstDonation
    );
  }, [userStatistics, donateApp]);
  const shouldShowContribute = useCallback(
    () =>
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowContribute ===
        0 || Number(userStatistics?.totalTickets) === firstDonation,
    [userStatistics],
  );

  const shouldShowEmailCheckbox = useCallback(
    () =>
      Number(userStatistics?.totalTickets) <=
        quantityOfDonationsToShowEmailCheckbox ||
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowEmailCheckbox ===
        0 ||
      Number(userStatistics?.totalTickets) === firstDonation ||
      // eslint-disable-next-line no-self-compare
      1 === 1,
    [userStatistics],
  );

  useEffect(() => {
    refetchStatistics();
  }, [currentUser]);

  function navigate() {
    refetch();

    if (flow === "login") {
      registerAction("donation_done_page_view");

      if (shouldShowAppDownload()) {
        navigateTo({
          pathname: "/app-download",
          state: { nonProfit, showContribute: shouldShowContribute() },
        });
      } else if (!isLoading && shouldShowContribute()) {
        navigateTo({
          pathname: "/post-donation",
          state: { nonProfit, cause },
        });
      } else {
        navigateTo({
          pathname: "/causes",
          state: { cause },
        });
      }
    }
    if (allowedEmailMarketing) {
      logEvent("acceptReceiveEmail_click", {
        from: "confirmedDonation_page",
      });
      updateUserConfig({ allowedEmailMarketing });
    }
    if (flow === "magicLink") {
      navigateTo("/extra-ticket");
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
      <S.DonationValue>{t("title")}</S.DonationValue>
      <S.PostDonationText>{t("description")}</S.PostDonationText>
      <S.ImpactDescription>{bottomText}</S.ImpactDescription>
    </>
  );

  const renderImpactValue = () => oldImpactFormat();

  const image =
    "https://ribon-core-api-production.s3.amazonaws.com/utz4g50bsqvqg6q78p1e9metu96v?response-content-disposition=inline%3B%20filename%3D%22cardAMF.jpg%22%3B%20filename%2A%3DUTF-8%27%27cardAMF.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA42ZX7UC72NBLHNXM%2F20231121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231121T185926Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=84db2749d41043f8134151085d04d73d11c53b2e4ae15ab6df464e68117deb87";

  return (
    <S.Container>
      {audio && <ReactHowler src={audio} loop={false} playing />}
      <S.ImageContainer>
        <S.Diamond bg={image} />
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

export default ticketDonationDonePage;
