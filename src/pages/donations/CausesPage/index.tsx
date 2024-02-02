import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useIntegration,
  useCanDonate,
  useFirstAccessToIntegration,
  useTickets,
} from "@ribon.io/shared/hooks";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import extractUrlValue from "lib/extractUrlValue";
import {
  INTEGRATION_AUTH_ID,
  PLATFORM,
  RIBON_COMPANY_ID,
} from "utils/constants";
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCauseDonationContext } from "contexts/causeDonationContext";
import NonProfitsSection from "pages/donations/CausesPage/NonProfitsSection";
import IntegrationBanner from "components/moleculars/banners/IntegrationBanner";
import { useLanguage } from "hooks/useLanguage";
import CampaignSection from "pages/donations/CausesPage/CampaignSection";
import { useAuthentication } from "contexts/authenticationContext";
import { useTicketsContext } from "contexts/ticketsContext";
import ContributionNotification from "./ContributionNotification";
import { LocationStateType } from "./LocationStateType";
import ChooseCauseModal from "./ChooseCauseModal";
import CausesSelectSection from "./CausesSelectSection";
import * as S from "./styles";

function CausesPage(): JSX.Element {
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const [shouldShowIntegrationBanner, setShouldShowIntegrationBanner] =
    useState<boolean | undefined>(false);
  const { chooseCauseModalVisible } = useCauseDonationContext();
  const { currentLang } = useLanguage();
  const { isAuthenticated } = useAuthentication();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state, search } = useLocation<LocationStateType>();

  const { hide: closeWarningModal } = useModal(
    {
      type: MODAL_TYPES.MODAL_DIALOG,
      props: {
        title: t("errorModalTitle"),
        description: state?.message || t("errorModalText"),
        primaryButton: {
          text: t("errorModalButtonText"),
          onClick: () => closeWarningModal(),
        },
        onClose: () => closeWarningModal(),
        eventName: "P12_errorModal",
        supportButton: true,
        type: "error",
      },
    },
    state?.failedDonation,
  );

  const hasSeenChooseCauseModal = useRef(false);

  const { showReceiveTicketToast } = useReceiveTicketToast();
  const { canCollectByIntegration, collectByIntegration } = useTickets();
  const { refetchTickets, ticketsCounter } = useTicketsContext();
  const { currentUser } = useCurrentUser();

  const externalId = extractUrlValue("external_id", search);
  const { canDonate, refetch: refetchCanDonate } = useCanDonate(
    integrationId,
    PLATFORM,
    externalId,
  );
  const { isFirstAccessToIntegration } = useFirstAccessToIntegration(
    integration?.id || integrationId,
  );

  const { isMobile } = useBreakpoint();

  function hasReceivedTicketToday() {
    const donationToastSeenAtKey = getLocalStorageItem(
      DONATION_TOAST_SEEN_AT_KEY,
    );
    const donationToastIntegration = getLocalStorageItem(
      DONATION_TOAST_INTEGRATION,
    );

    if (
      donationToastSeenAtKey &&
      donationToastIntegration === integrationId?.toLocaleString()
    ) {
      const dateUserSawToast = new Date(parseInt(donationToastSeenAtKey, 10));
      return dateUserSawToast.toLocaleDateString() === today();
    }
    return false;
  }

  const hasAvailableDonation = useCallback(
    () => !state?.blockedDonation && canDonate,
    [state?.blockedDonation, canDonate],
  );

  async function receiveTicket() {
    const { canCollect } = await canCollectByIntegration(
      integrationId ?? "",
      currentUser?.email ?? "",
      PLATFORM,
    );
    if (canCollect && !hasReceivedTicketToday()) {
      if (isAuthenticated()) {
        await collectByIntegration(
          integrationId ?? "",
          currentUser?.email ?? "",
          PLATFORM,
        );
      }
      setLocalStorageItem(DONATION_TOAST_SEEN_AT_KEY, Date.now().toString());
      setLocalStorageItem(
        DONATION_TOAST_INTEGRATION,
        integrationId?.toLocaleString() ?? RIBON_COMPANY_ID,
      );
      showReceiveTicketToast();
      refetchTickets();
    }
  }

  useEffect(() => {
    refetchCanDonate();
  }, [JSON.stringify(currentUser)]);

  useEffect(() => {
    refetchTickets();
  }, [ticketsCounter, currentUser, isAuthenticated, integrationId]);

  useEffect(() => {
    if (isFirstAccessToIntegration !== undefined) {
      receiveTicket();
    }
  }, [isFirstAccessToIntegration, integrationId]);

  useEffect(() => {
    setShouldShowIntegrationBanner(
      !integration?.name?.toLowerCase()?.includes("ribon") &&
        hasAvailableDonation() &&
        hasReceivedTicketToday() &&
        integration?.uniqueAddress !== INTEGRATION_AUTH_ID,
    );
  }, [integration, isFirstAccessToIntegration]);

  useEffect(() => {
    if (chooseCauseModalVisible && !hasSeenChooseCauseModal.current) {
      hasSeenChooseCauseModal.current = true;
    } else if (!chooseCauseModalVisible && hasSeenChooseCauseModal.current) {
      hasSeenChooseCauseModal.current = false;
    }
  }, [chooseCauseModalVisible]);

  useAvoidBackButton();

  return (
    <S.Container>
      <DownloadAppToast />
      {shouldShowIntegrationBanner && (
        <IntegrationBanner integration={integration} />
      )}
      <ChooseCauseModal visible={chooseCauseModalVisible} />
      <S.BodyContainer>
        <S.TitleContainer>
          {canDonate && <S.Title>{t("pageTitle")}</S.Title>}

          {!isMobile && (
            <Tooltip
              text={t("tooltipTicketText")}
              symbol="?"
              textRight={t("tooltipTicket")}
              place="top"
              idTooltip="tooltipTicket"
            />
          )}
        </S.TitleContainer>

        {!canDonate && currentLang === "pt-BR" && (
          <CampaignSection cardId="1" />
        )}
        <ContributionNotification />
        <CausesSelectSection />
        <NonProfitsSection />
        {isMobile && (
          <S.TooltipSection>
            <Tooltip
              text={t("tooltipTicketText")}
              symbol="?"
              textRight={t("tooltipTicket")}
              place="bottom"
              idTooltip="tooltipTicket"
            />
          </S.TooltipSection>
        )}
        <UserSupportBanner from="donateTickets_page" />
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
