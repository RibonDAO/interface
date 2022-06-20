import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import NonProfit from "types/entities/NonProfit";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import Loader from "components/atomics/Loader";
import { logError } from "services/crashReport";
import { useLocation } from "react-router-dom";
import useUsers from "hooks/apiHooks/useUsers";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import useIntegration from "hooks/apiHooks/useIntegration";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { DONATION_MODAL_SEEN_AT_KEY } from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";
import { useDonationTicketModal } from "hooks/modalHooks/useDonationTicketModal";
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
  const { signedIn, setCurrentUser, userLastDonation } = useCurrentUser();
  const { showDonationTicketModal } = useDonationTicketModal();

  function hasDonateToday() {
    return userLastDonation === today();
  }

  useEffect(() => {
    logEvent("donateIntroDial_view");
    if (
      !state?.blockedDonation &&
      !hasDonateToday() &&
      hasNotSeenDonationModal
    ) {
      setLocalStorageItem(DONATION_MODAL_SEEN_AT_KEY, Date.now().toString());
      showDonationTicketModal();
    }
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  const donate = useCallback(
    async (email: string) => {
      try {
        if (!signedIn) {
          const user = await findOrCreateUser(email);
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
        {isLoading ? (
          <Loader />
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
