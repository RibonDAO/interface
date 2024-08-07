import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFirstAccessToIntegration,
  useDonatedToday,
} from "@ribon.io/shared/hooks";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import { INTEGRATION_AUTH_ID } from "utils/constants";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import NonProfitsSection from "pages/donations/CausesPage/NonProfitsSection";
import IntegrationBanner from "components/moleculars/banners/IntegrationBanner";
import CampaignSection from "pages/donations/CausesPage/CampaignSection";
import { useTicketsContext } from "contexts/ticketsContext";
import useNavigation from "hooks/useNavigation";
import ReportsSection from "./ReportsSection";
import ContributionNotification from "./ContributionNotification";
import { LocationStateType } from "./LocationStateType";
import TagsSelectSection from "./TagsSelectSection";
import showErrorModal from "./errorModal";
import MadeByRibonSection from "./MadeByRibonSection";
import * as S from "./styles";

function CausesPage(): JSX.Element {
  const { currentIntegrationId: integrationId, integration } =
    useIntegrationContext();
  const [shouldShowIntegrationBanner, setShouldShowIntegrationBanner] =
    useState<boolean | undefined>(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state } = useLocation<LocationStateType>();
  showErrorModal(state);
  const { navigateTo } = useNavigation();
  const { signedIn } = useCurrentUser();
  const { hasTickets, refetchTickets } = useTicketsContext();
  const { isFirstAccessToIntegration } = useFirstAccessToIntegration(
    integration?.id || integrationId,
  );
  const { isMobile } = useBreakpoint();
  const { donatedToday } = useDonatedToday();

  useEffect(() => {
    setShouldShowIntegrationBanner(
      !integration?.name?.toLowerCase()?.includes("ribon") &&
        hasTickets &&
        integration?.uniqueAddress !== INTEGRATION_AUTH_ID,
    );
  }, [integration, isFirstAccessToIntegration]);

  const handleInfoClick = () => {
    navigateTo("/intro/step-3");
  };

  useEffect(() => {
    refetchTickets();
  }, []);

  useAvoidBackButton();

  return (
    <S.Container>
      {signedIn && !isFirstAccessToIntegration && <DownloadAppToast />}
      <S.BodyContainer>
        <S.TitleContainer>
          {hasTickets && <S.Title>{t("pageTitle")}</S.Title>}

          {!isMobile && (
            <Tooltip
              textRight={t("tooltipTicket")}
              symbol="?"
              place="top"
              idTooltip="tooltipTicket"
              onClick={handleInfoClick}
            />
          )}
        </S.TitleContainer>

        {donatedToday && <CampaignSection cardId="1" />}

        <ContributionNotification />
        <TagsSelectSection />
        <NonProfitsSection />
        {isMobile && (
          <S.TooltipSection>
            <Tooltip
              textRight={t("tooltipTicket")}
              symbol="?"
              place="top"
              idTooltip="tooltipTicket"
              onClick={handleInfoClick}
            />
          </S.TooltipSection>
        )}

        {shouldShowIntegrationBanner && (
          <IntegrationBanner integration={integration} />
        )}

        {signedIn && !isFirstAccessToIntegration && <ReportsSection />}
        <MadeByRibonSection />
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;
