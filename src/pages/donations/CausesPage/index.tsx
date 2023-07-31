import { useCallback, useEffect, useRef } from "react";
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
import PromoterCta from "pages/donations/CausesPage/PromoterCta";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCauseDonationContext } from "contexts/causeDonationContext";
import * as S from "./styles";
import ContributionNotification from "./ContributionNotification";
import NonProfitsList from "./NonProfitsList";
import { LocationStateType } from "./LocationStateType";
import ChooseCauseModal from "./ChooseCauseModal";

function CausesPage(): JSX.Element {
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const { causes, isLoading: isLoadingCauses } = useCausesContext();
  const {
    chosenCause,
    setChosenCause,
    chosenCauseIndex,
    setChosenCauseIndex,
    chooseCauseModalVisible,
  } = useCauseDonationContext();
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
    if (chosenCause) {
      return (
        nonProfits?.filter(
          (nonProfit) =>
            nonProfit.cause?.active && nonProfit.cause?.id === chosenCause.id,
        ) || []
      );
    }

    return nonProfits || [];
  };

  useEffect(() => {
    nonProfitsFilter();
  }, [chosenCause]);

  const handleCauseChanged = (_element: any, index: number, event: any) => {
    if (_element && event?.type === "click") {
      const cause = _element;
      setChosenCauseIndex(index);
      if (cause.id !== 0) {
        setChosenCause(cause);
      } else {
        setChosenCause(undefined);
      }
    }
  };

  const causesWithAllFilter = [
    {
      id: 0,
      name: t("allCauses"),
    },
    ...(causes || []),
  ];

  useAvoidBackButton();

  return (
    <S.Container>
      {!isFirstAccess(signedIn) && <DownloadAppToast />}
      {!isLoadingCauses && (
        <ChooseCauseModal visible={chooseCauseModalVisible} />
      )}
      {!isFirstAccess(signedIn) && <PromoterCta />}
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
        {!isFirstAccess(signedIn) && (
          <GroupButtons
            elements={causesWithAllFilter}
            indexSelected={chosenCauseIndex}
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
