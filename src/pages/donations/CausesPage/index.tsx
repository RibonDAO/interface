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
import { isFirstAccess } from "lib/onboardingFirstAccess";
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
import GroupButtons from "components/moleculars/sections/GroupButtons";
import useVoucher from "hooks/useVoucher";
import { useCausesContext } from "contexts/causesContext";
import * as S from "./styles";
import NonProfitsList from "./NonProfitsList";
import { LocationStateType } from "./LocationStateType";
import ConfirmSection from "./ConfirmSection";
import ChooseCauseModal from "./ChooseCauseModal";

function CausesPage(): JSX.Element {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [currentNonProfitIndex, setCurrentNonProfitIndex] = useState(0);
  const [donationInProcessModalVisible, setDonationInProcessModalVisible] =
    useState(false);
  const [chosenNonProfit, setChosenNonProfit] = useState<NonProfit>();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const {
    activeCauses,
    chooseCauseModalVisible,
    currentCauseId,
    setCurrentCauseId,
  } = useCausesContext();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state } = useLocation<LocationStateType>();

  const { hide: closeWarningModal } = useModal(
    {
      type: MODAL_TYPES.MODAL_ERROR,
      props: {
        title: t("errorModalTitle"),
        body: state?.message || t("errorModalText"),
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
  const { createVoucher } = useVoucher();

  useEffect(() => {
    if (canDonate) createVoucher();
  }, [canDonate]);

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

  const nonProfitsFilter = () => {
    const nonProfitsApi = nonProfits?.filter(
      (nonProfit) => nonProfit.cause?.active,
    );
    return nonProfitsApi || [];
  };

  const handleCauseChanged = (_element: any, index: number, event: any) => {
    setSelectedButtonIndex(index);

    if (_element && event?.type === "click") {
      const causeId = _element?.id;

      if (nonProfits && causeId) {
        const nonProfitIndex = nonProfits.findIndex(
          (nonProfit) => nonProfit?.cause?.id === causeId,
        );
        setCurrentNonProfitIndex(nonProfitIndex);
      }
    }
  };

  useEffect(() => {
    if (nonProfits && nonProfits[currentNonProfitIndex]) {
      const currentNonProfit = nonProfits[currentNonProfitIndex];
      const currentCause = causesFilter()[selectedButtonIndex];

      if (currentNonProfit?.cause.id !== currentCause?.id) {
        const newCauseIndex = causesFilter().findIndex(
          (cause) => cause.id === currentNonProfit.cause.id,
        );
        setSelectedButtonIndex(newCauseIndex);
      }
    }
  }, [currentNonProfitIndex]);

  return (
    <S.Container>
      <ChooseCauseModal visible={chooseCauseModalVisible} />
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
        {!isFirstAccess(signedIn) && (
          <GroupButtons
            elements={activeCauses}
            indexSelected={selectedButtonIndex}
            onChange={handleCauseChanged}
            nameExtractor={(cause) => cause.name}
          />
        )}
        {isLoading ? (
          <Spinner size="26" />
        ) : (
          nonProfits && (
            <S.NonProfitsContainer>
              <NonProfitsList
                nonProfits={nonProfitsFilter()}
                setChosenNonProfit={setChosenNonProfit}
                setConfirmModalVisible={setConfirmModalVisible}
                canDonate={canDonate}
                integration={integration}
                currentNonProfit={currentNonProfitIndex}
                onCurrentNonProfitChange={setCurrentNonProfitIndex}
              />
            </S.NonProfitsContainer>
          )
        )}
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
