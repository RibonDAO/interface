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
import ImageWithIconOverlay from "components/atomics/ImageWithIconOverlay";
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
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const [shouldShowIntegrationBanner, setShouldShowIntegrationBanner] =
    useState<boolean | undefined>(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state } = useLocation<LocationStateType>();
  showErrorModal(state);
  const { navigateTo } = useNavigation();
  const { refetchTickets, hasTickets } = useTicketsContext();
  const { signedIn } = useCurrentUser();
  const { isFirstAccessToIntegration } = useFirstAccessToIntegration(
    integration?.id || integrationId,
  );

  const { isMobile } = useBreakpoint();
  const { donatedToday } = useDonatedToday();

  useEffect(() => {
    refetchTickets();
  }, []);

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

  useAvoidBackButton();

  return (
    <S.Container>
      <DownloadAppToast />
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
