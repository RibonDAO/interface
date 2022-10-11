import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";

import NonProfit from "types/entities/NonProfit";
import useNonProfits from "hooks/apiHooks/useNonProfits";

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
import Spinner from "components/atomics/Spinner";
import useCanDonate from "hooks/apiHooks/useCanDonate";
import { logError } from "services/crashReport";
import * as S from "./styles";
import NonProfitsList from "./NonProfitsList";
import { LocationStateType } from "./LocationStateType";
import ConfirmSection from "./ConfirmSection";

function CausesPage(): JSX.Element {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [donationInProcessModalVisible, setDonationInProcessModalVisible] =
    useState(false);
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

  const { nonProfits, isLoading } = useNonProfits();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { showDonationTicketModal } = useDonationTicketModal(
    undefined,
    integration,
  );
  const { canDonate } = useCanDonate(integrationId);

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

  const hasAvailableDonation = !state?.blockedDonation && canDonate;

  useEffect(() => {
    if (
      !hasReceivedTicketToday() ||
      (hasAvailableDonation && hasNotSeenDonationModal)
    ) {
      if (integration) {
        setLocalStorageItem(DONATION_MODAL_SEEN_AT_KEY, Date.now().toString());
        showDonationTicketModal();
      }
    }
  }, [integration]);

  useEffect(() => {
    if (integration) {
      // eslint-disable-next-line no-console
      console.log(integration);
      logEvent("donateIntroDial_view", { integration: integration.name });
    }
  }, [integration]);

  useEffect(() => {
    if (state?.failedDonation) logEvent("donateDonationError_view");
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  const donateTicket = useCallback(
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
      {chosenNonProfit && integration && (
        <ConfirmSection
          chosenNonProfit={chosenNonProfit}
          donateTicket={donateTicket}
          integration={integration}
          setDonationInProcessModalVisible={setDonationInProcessModalVisible}
          confirmModalVisible={confirmModalVisible}
          donationInProcessModalVisible={donationInProcessModalVisible}
          setConfirmModalVisible={setConfirmModalVisible}
          closeConfirmModal={closeConfirmModal}
        />
      )}

      <S.BodyContainer>
        <S.Title>{t("pageTitle")}</S.Title>
        {isLoading ? (
          <Spinner size="26" />
        ) : (
          <S.CausesContainer>
            {nonProfits && (
              <NonProfitsList
                nonProfits={nonProfits}
                setChosenNonProfit={setChosenNonProfit}
                setConfirmModalVisible={setConfirmModalVisible}
                canDonate={canDonate}
              />
            )}
          </S.CausesContainer>
        )}
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
