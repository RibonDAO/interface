import { useTranslation } from "react-i18next";
import ticketImage from "assets/images/ticket-image.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { RIBON_COMPANY_ID } from "utils/constants";
import Tooltip from "components/moleculars/Tooltip";
import Button from "components/atomics/buttons/Button";
import RibonLogo from "assets/images/logo-ribon.svg";
import { logEvent } from "lib/events";
import { theme } from "@ribon.io/shared/styles";
import RightImageIntegration from "./assets/right-image.svg";
import LeftImageIntegration from "./assets/left-image.svg";
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
    logEvent("P10_getTicketBtn_click");

    if (isOnboarding) {
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
            <S.ImageContainer>
              <S.LeftImageContainer
                src={LeftImageIntegration}
                alt="left-image"
              />
              <S.RightImageContainer
                src={RightImageIntegration}
                alt="right-image"
              />
              <S.ImageWrapper>
                <img src={RibonLogo} alt="ribon-logo" />
                <S.ImageContainerText>+</S.ImageContainerText>
                <S.Image src={integration?.logo} />
              </S.ImageWrapper>
            </S.ImageContainer>
          )}
          <S.TextContainer>
            <S.Title>{isOnboarding ? titleOnboarding : t("title")}</S.Title>
            <S.Description>{subtitle}</S.Description>
          </S.TextContainer>
          <S.FilledButton onClick={handleClick}>{buttonText}</S.FilledButton>
          <Button
            text={t("hasAccountButton")}
            textColor={theme.colors.neutral[600]}
            backgroundColor="transparent"
            borderColor={theme.colors.neutral[300]}
            borderRadius="4px"
            onClick={() => navigateTo("/auth/sign-in")}
          />
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
