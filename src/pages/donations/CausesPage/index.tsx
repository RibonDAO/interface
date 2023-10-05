import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useIntegration,
  useCanDonate,
  useFirstAccessToIntegration,
} from "@ribon.io/shared/hooks";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { DONATION_TOAST_SEEN_AT_KEY } from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";
import useVoucher from "hooks/useVoucher";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import WarningIcon from "assets/icons/warning-icon.svg";
import extractUrlValue from "lib/extractUrlValue";
import { PLATFORM } from "utils/constants";
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCauseDonationContext } from "contexts/causeDonationContext";
import NonProfitsSection from "pages/donations/CausesPage/NonProfitsSection";
import IntegrationBanner from "components/moleculars/banners/IntegrationBanner";
import { useExperiment } from "@growthbook/growthbook-react";
import ImpactMoreLivesCTA from "pages/users/ImpactedLivesSection/ImpactMoreLivesCTA";
import ContributionSection from "pages/donations/CausesPage/ContributionSection";
import { useLanguage } from "hooks/useLanguage";
import * as S from "./styles";
import ContributionNotification from "./ContributionNotification";
import { LocationStateType } from "./LocationStateType";
import ChooseCauseModal from "./ChooseCauseModal";
import CausesSelectSection from "./CausesSelectSection";

function CausesPage(): JSX.Element {
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const [shouldShowIntegrationBanner, setShouldShowIntegrationBanner] =
    useState<boolean | undefined>(false);
  const { chooseCauseModalVisible } = useCauseDonationContext();
  const { currentLang } = useLanguage();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state, search } = useLocation<LocationStateType>();

  const { value: isTicketBasedImpact } = useExperiment({
    key: "ticket-impact-test",
    variations: [false, true],
  });

  const { hide: closeWarningModal } = useModal(
    {
      type: MODAL_TYPES.MODAL_ICON,
      props: {
        title: t("errorModalTitle"),
        body: state?.message || t("errorModalText"),
        primaryButton: {
          text: t("errorModalButtonText"),
          onClick: () => closeWarningModal(),
        },
        onClose: () => closeWarningModal(),
        icon: WarningIcon,
        supportButton: true,
        eventName: "P12_errorModal",
      },
    },
    state?.failedDonation,
  );

  const hasSeenDonationToast = !!getLocalStorageItem(
    DONATION_TOAST_SEEN_AT_KEY,
  );

  const hasSeenChooseCauseModal = useRef(false);

  const { showReceiveTicketToast } = useReceiveTicketToast();
  const { signedIn, currentUser } = useCurrentUser();

  const externalId = extractUrlValue("external_id", search);
  const { canDonate, refetch: refetchCanDonate } = useCanDonate(
    integrationId,
    PLATFORM,
    externalId,
  );
  const { createVoucher } = useVoucher();
  const {
    isFirstAccessToIntegration,
    isLoading: isLoadingIsFirstAccessToIntegration,
  } = useFirstAccessToIntegration(integration?.id || integrationId);

  const { isMobile } = useBreakpoint();

  function hasReceivedTicketToday() {
    const donationToastSeenAtKey = getLocalStorageItem(
      DONATION_TOAST_SEEN_AT_KEY,
    );

    if (donationToastSeenAtKey) {
      const dateUserSawToast = new Date(parseInt(donationToastSeenAtKey, 10));
      return dateUserSawToast.toLocaleDateString() === today();
    }
    return false;
  }

  const hasAvailableDonation = useCallback(
    () => !state?.blockedDonation && canDonate,
    [state?.blockedDonation, canDonate],
  );

  useEffect(() => {
    refetchCanDonate();
  }, [JSON.stringify(currentUser)]);

  useEffect(() => {
    if (hasReceivedTicketToday() && hasAvailableDonation()) {
      createVoucher();
    } else if (
      !hasReceivedTicketToday() ||
      (hasAvailableDonation() && !hasSeenDonationToast)
    ) {
      if (
        integration &&
        !isFirstAccessToIntegration &&
        !isLoadingIsFirstAccessToIntegration
      ) {
        setLocalStorageItem(DONATION_TOAST_SEEN_AT_KEY, Date.now().toString());
        showReceiveTicketToast();
        createVoucher();
      }
    }
    setShouldShowIntegrationBanner(
      !integration?.name?.toLowerCase()?.includes("ribon") &&
        hasAvailableDonation() &&
        hasReceivedTicketToday(),
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

  const buttonVariation = useExperiment({
    key: "conversion-test-donate-btn",
    variations: ["control", "button", "button_and_info"],
  });

  const isInButtonVariation = buttonVariation.value !== "control";

  return (
    <S.Container>
      {!isFirstAccess(signedIn) && <DownloadAppToast />}
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
        {!canDonate && isTicketBasedImpact && !isInButtonVariation && (
          <S.ImpactMoreLivesContainer>
            <ImpactMoreLivesCTA from="causes_page" />
          </S.ImpactMoreLivesContainer>
        )}
        {!canDonate && !isTicketBasedImpact && currentLang === "pt-BR" && (
          <ContributionSection />
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
