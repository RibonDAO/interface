import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useIntegration,
  useFirstAccessToIntegration,
  useDonatedToday,
} from "@ribon.io/shared/hooks";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import extractUrlValue from "lib/extractUrlValue";
import { INTEGRATION_AUTH_ID, RIBON_COMPANY_ID } from "utils/constants";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import NonProfitsSection from "pages/donations/CausesPage/NonProfitsSection";
import IntegrationBanner from "components/moleculars/banners/IntegrationBanner";
import CampaignSection from "pages/donations/CausesPage/CampaignSection";
import { useTicketsContext } from "contexts/ticketsContext";
import { useTickets } from "hooks/useTickets";
import { logEvent } from "lib/events";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import { setLocalStorageItem } from "lib/localStorage";
import useNavigation from "hooks/useNavigation";
import ReportsSection from "./ReportsSection";
import ContributionNotification from "./ContributionNotification";
import { LocationStateType } from "./LocationStateType";
import CausesSelectSection from "./CausesSelectSection";
import * as S from "./styles";

import showErrorModal from "./errorModal";

function CausesPage(): JSX.Element {
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const [shouldShowIntegrationBanner, setShouldShowIntegrationBanner] =
    useState<boolean | undefined>(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state, search } = useLocation<LocationStateType>();
  showErrorModal(state);

  const { refetchTickets, hasTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const externalId = extractUrlValue("external_id", search);
  const { isFirstAccessToIntegration } = useFirstAccessToIntegration(
    integration?.id || integrationId,
  );

  const { isMobile } = useBreakpoint();
  const { donatedToday } = useDonatedToday();
  const { navigateTo } = useNavigation();

  const { handleCanCollect, handleCollect, hasReceivedTicketToday } =
    useTickets();

  const { showReceiveTicketToast } = useReceiveTicketToast();
  const isRibonIntegration =
    integrationId?.toString() === RIBON_COMPANY_ID.toString();

  async function receiveTicket() {
    const canCollect = await handleCanCollect();
    if (canCollect) {
      if (currentUser && !hasReceivedTicketToday()) {
        if (isRibonIntegration) {
          await handleCollect({
            onSuccess: () => {
              logEvent("ticketCollected", { from: "collect" });
            },
          });
          refetchTickets();

          showReceiveTicketToast();
          setLocalStorageItem(RECEIVED_TICKET_AT_KEY, Date.now().toString());
          setLocalStorageItem(
            RECEIVED_TICKET_FROM_INTEGRATION,
            integrationId?.toLocaleString() ?? RIBON_COMPANY_ID,
          );
        } else {
          navigateTo("/intro/receive-tickets");
        }
      }
    } else {
      refetchTickets();
    }
  }

  useEffect(() => {
    if (isFirstAccessToIntegration !== undefined) {
      receiveTicket();
    }
  }, [isFirstAccessToIntegration, externalId]);

  useEffect(() => {
    setShouldShowIntegrationBanner(
      !integration?.name?.toLowerCase()?.includes("ribon") &&
        hasTickets &&
        integration?.uniqueAddress !== INTEGRATION_AUTH_ID,
    );
  }, [integration, isFirstAccessToIntegration]);

  useAvoidBackButton();

  return (
    <S.Container>
      <DownloadAppToast />
      {shouldShowIntegrationBanner && (
        <IntegrationBanner integration={integration} />
      )}
      <S.BodyContainer>
        <S.TitleContainer>
          {hasTickets && <S.Title>{t("pageTitle")}</S.Title>}

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

        {donatedToday && <CampaignSection cardId="1" />}

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
        <ReportsSection />
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
