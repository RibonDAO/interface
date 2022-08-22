import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import NonProfit from "types/entities/NonProfit";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import { logError } from "services/crashReport";
import { useLocation } from "react-router-dom";
import useUsers from "hooks/apiHooks/useUsers";
import useSources from "hooks/apiHooks/useSources";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import useIntegration from "hooks/apiHooks/useIntegration";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { DONATION_MODAL_SEEN_AT_KEY } from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";
import { useDonationTicketModal } from "hooks/modalHooks/useDonationTicketModal";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import Spinner from "components/atomics/Spinner";
import * as S from "./styles";
import NonProfitsList from "./NonProfitsList";
import { LocationStateType } from "./LocationStateType";
import ConfirmSection from "./ConfirmSection";

function CausesPage(): JSX.Element {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [chosenNonProfit, setChosenNonProfit] = useState<NonProfit>();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state } = useLocation<LocationStateType>();

  const { hide: closeWarningModal } = useModal(
    {
      type: MODAL_TYPES.MODAL_ERROR,
      props: {
        title: t("errorModalTitle"),
        body: t("errorModalText"),
        buttonText: t("errorModalButtonText"),
        onClose: () => closeWarningModal(),
        warning: true,
      },
    },
    state?.failedDonation,
  );

  const hasNotSeenDonationModal = !getLocalStorageItem(
    DONATION_MODAL_SEEN_AT_KEY,
  );

  const { navigateTo } = useNavigation();
  const { nonProfits, isLoading } = useNonProfits();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { signedIn, setCurrentUser, userLastDonation } = useCurrentUser();
  const { showDonationTicketModal } = useDonationTicketModal();

  function hasDonateToday() {
    return userLastDonation === today();
  }

  function hasReceivedTicketToday() {
    const donationModalSeenAtKey = getLocalStorageItem(
      DONATION_MODAL_SEEN_AT_KEY,
    );

    if (donationModalSeenAtKey) {
      const dateUserSawModal = new Date(parseInt(donationModalSeenAtKey, 10));
      return dateUserSawModal.toLocaleDateString() === today();
    }
    return false;
  }

  const hasAvailableDonation = !state?.blockedDonation && !hasDonateToday();

  useEffect(() => {
    logEvent("donateIntroDial_view");

    if (
      !hasReceivedTicketToday() ||
      (hasAvailableDonation && hasNotSeenDonationModal)
    ) {
      setLocalStorageItem(DONATION_MODAL_SEEN_AT_KEY, Date.now().toString());
      showDonationTicketModal();
    }
  }, []);

  useEffect(() => {
    if (state?.failedDonation) logEvent("donateDonationError_view");
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  const donate = useCallback(
    async (email: string) => {
      try {
        if (!signedIn) {
          logEvent("authDonationDialButton_click");
          const user = await findOrCreateUser(email);
          if (integration) {
            createSource(user.id, integration.id);
          }
          setCurrentUser(user);
        }
        navigateTo({
          pathname: "/donation-in-process",
          state: { nonProfit: chosenNonProfit, integration },
        });
      } catch (e) {
        logError(e);
      }
      logEvent("donateConfirmDialButton_click", {
        causeId: chosenNonProfit?.id,
      });
    },
    [chosenNonProfit],
  );

  return (
    <S.Container>
      {chosenNonProfit && (
        <ConfirmSection
          chosenNonProfit={chosenNonProfit}
          donate={donate}
          confirmModalVisible={confirmModalVisible}
          setConfirmModalVisible={setConfirmModalVisible}
          closeConfirmModal={closeConfirmModal}
        />
      )}

      <S.BodyContainer>
        <S.Title>{t("pageTitle")}</S.Title>
        <IfFeatureEnabled feature="teste-1">
          <p>.</p>
        </IfFeatureEnabled>
        {isLoading ? (
          <Spinner size="26" />
        ) : (
          <S.CausesContainer>
            {nonProfits && (
              <NonProfitsList
                nonProfits={nonProfits}
                setChosenNonProfit={setChosenNonProfit}
                setConfirmModalVisible={setConfirmModalVisible}
              />
            )}
          </S.CausesContainer>
        )}
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
