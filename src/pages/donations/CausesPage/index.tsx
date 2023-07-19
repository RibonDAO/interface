import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFreeDonationNonProfits,
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
import Spinner from "components/atomics/Spinner";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import useVoucher from "hooks/useVoucher";
import { useCausesContext } from "contexts/causesContext";
import { track } from "@amplitude/analytics-browser";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import WarningIcon from "assets/icons/warning-icon.svg";
import extractUrlValue from "lib/extractUrlValue";
import { PLATFORM } from "utils/constants";
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import * as S from "./styles";
import ContributionNotification from "./ContributionNotification";
import NonProfitsList from "./NonProfitsList";
import { LocationStateType } from "./LocationStateType";
import ChooseCauseModal from "./ChooseCauseModal";
import ContributionSection from "./ContributionSection";

function CausesPage(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
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
  const { state, search } = useLocation<LocationStateType>();

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
        eventName: "P1_donateErrorModal",
      },
    },
    state?.failedDonation,
  );

  const hasSeenDonationToast = !!getLocalStorageItem(
    DONATION_TOAST_SEEN_AT_KEY,
  );

  const hasSeenChooseCauseModal = useRef(false);

  const { nonProfits, isLoading } = useFreeDonationNonProfits();
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
    track("Cause Page View");
  }, []);

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
  }, [integration, isFirstAccessToIntegration]);

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

  const canDonateAndHasVoucher = canDonate && hasAvailableDonation();

  return (
    <S.Container>
      {!isFirstAccess(signedIn) && <DownloadAppToast />}
      <ChooseCauseModal visible={chooseCauseModalVisible} />

      <S.BodyContainer>
        <S.TitleContainer>
          <S.Title>{t("pageTitle")}</S.Title>

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
        <ContributionNotification />
        {!canDonateAndHasVoucher && <ContributionSection />}
        {!isFirstAccess(signedIn) && (
          <GroupButtons
            elements={causesWithAllFilter}
            indexSelected={selectedButtonIndex}
            onChange={handleCauseChanged}
            nameExtractor={(cause) => cause.name}
            eventParams={(cause) => ({ causeId: cause.id })}
            eventName="P1_causeTab"
          />
        )}

        {isLoading ? (
          <Spinner size="26" />
        ) : (
          nonProfits && (
            <S.NonProfitsContainer>
              <NonProfitsList
                nonProfits={nonProfitsFilter()}
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
