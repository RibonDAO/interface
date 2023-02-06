import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics/firebase";
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
import UserSupportSection from "pages/promoters/SupportTreasurePage/CardSection/UserSupportSection";
import { track } from "@amplitude/analytics-browser";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import * as S from "./styles";
import NonProfitsList from "./NonProfitsList";
import { LocationStateType } from "./LocationStateType";
import ConfirmSection from "./ConfirmSection";
import ChooseCauseModal from "./ChooseCauseModal";

function CausesPage(): JSX.Element {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
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

  const hasSeenChooseCauseModal = useRef(false);

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

  const { isMobile } = useBreakpoint();

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
    track("Cause Page View");
  }, []);

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

  useEffect(() => {
    if (chooseCauseModalVisible && !hasSeenChooseCauseModal.current) {
      hasSeenChooseCauseModal.current = true;
    } else if (!chooseCauseModalVisible && hasSeenChooseCauseModal.current) {
      hasSeenChooseCauseModal.current = false;
    }
  }, [chooseCauseModalVisible]);

  const nonProfitsFilter = () => {
    if (currentCauseId >= 1 && currentCauseId !== undefined) {
      return (
        nonProfits?.filter(
          (nonProfit) =>
            nonProfit.cause?.active && nonProfit.cause?.id === currentCauseId,
        ) || []
      );
    }

    return nonProfits || [];
  };

  const handleCauseChanged = (_element: any, index: number, event: any) => {
    if (_element && event?.type === "click") {
      const causeId = _element?.id;
      if (nonProfits && causeId !== undefined) {
        setCurrentCauseId(Number(causeId));
        setSelectedButtonIndex(index);
      }
    }
  };

  const causesWithAllFilter = [
    {
      id: 0,
      name: t("allCauses"),
    },
    ...(activeCauses || []),
  ];

  return (
    <S.Container>
      {!isFirstAccess(signedIn) && <DownloadAppToast />}
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
        <S.TitleContainer>
          <S.Title>{t("pageTitle")}</S.Title>
          {!isMobile && (
            <Tooltip
              text={t("tooltipTicketText")}
              symbol="?"
              textRight={t("tooltipTicket")}
              place="top"
            />
          )}
        </S.TitleContainer>
        {!isFirstAccess(signedIn) && (
          <GroupButtons
            elements={causesWithAllFilter}
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
              />
            </S.NonProfitsContainer>
          )
        )}
        {isMobile && (
          <S.TooltipSection>
            <Tooltip
              text={t("tooltipTicketText")}
              symbol="?"
              textRight={t("tooltipTicket")}
              place="bottom"
            />
          </S.TooltipSection>
        )}
        <UserSupportSection />
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
