import { useTranslation } from "react-i18next";
import ticketImage from "assets/images/ticket-image.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import CenterImage from "assets/images/center-shape-background.svg";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { RIBON_COMPANY_ID } from "utils/constants";
import Tooltip from "components/moleculars/Tooltip";
import { newLogEvent } from "lib/events";
import { useEffect } from "react";
import ArrowLeft from "./assets/arrow-left-dark-green.svg";
import * as S from "./styles";

export type Props = {
  isOnboarding?: boolean;
};

function GiveTicketPage({ isOnboarding = false }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.giveTicketPage",
  });
  const { navigateTo, navigateBack } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const handleClick = () => {
    if (isOnboarding) {
      newLogEvent("view", "receiveTicket", { from: "onboarding_page" });
      navigateTo("/receive-ticket");
    } else {
      navigateTo("/causes");
    }
  };

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  const titleOnboarding = isRibonIntegration
    ? t("onboardingRibonTitle")
    : t("onboardingIntegrationTitle", {
        integrationName: integration?.name,
      });

  const handleSubtitle = isRibonIntegration
    ? t("subtitle")
    : t("integrationSubtitle", {
        integrationName: integration?.name,
      });

  const subtitle = isOnboarding ? t("onboardingSubtitle") : handleSubtitle;

  const buttonText = isOnboarding ? t("onboardingButtonText") : t("buttonText");

  useEffect(() => {
    if (isOnboarding) {
      newLogEvent("view", "P10");
    } else {
      newLogEvent("view", "haveTickets_page");
    }
  }, [isOnboarding]);

  return (
    <S.Container>
      {!isOnboarding && (
        <S.BackArrowButton
          src={ArrowLeft}
          onClick={navigateBack}
          alt="back-arrow-button"
        />
      )}
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          {isRibonIntegration ? (
            <S.DefaultImage src={ticketImage} />
          ) : (
            <S.ImageContainer backgroundImage={CenterImage}>
              <S.Image src={integration?.logo} />
            </S.ImageContainer>
          )}
          <S.TextContainer>
            <S.Title>{isOnboarding ? titleOnboarding : t("title")}</S.Title>
            <S.Description>{subtitle}</S.Description>
          </S.TextContainer>
          <S.FilledButton onClick={handleClick}>{buttonText}</S.FilledButton>
          {!isOnboarding && (
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
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default GiveTicketPage;
