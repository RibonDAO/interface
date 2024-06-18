import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import useNavigation from "hooks/useNavigation";
import { useIntegrationContext } from "contexts/integrationContext";
import { useEffect } from "react";
import { RIBON_COMPANY_ID } from "utils/constants";
import Tooltip from "components/moleculars/Tooltip";
import Button from "components/atomics/buttons/Button";
import MadeByRibonPill from "components/atomics/MadeByRibonPill";
import { logEvent } from "lib/events";
import { theme } from "@ribon.io/shared/styles";
import { useTicketsContext } from "contexts/ticketsContext";
import LogoBackgroundIcon from "assets/icons/logo-background-icon.svg";
import ArrowLeft from "./assets/arrow-left-dark-green.svg";
import Wrapper from "./assets/wrapper.svg";
import * as S from "./styles";

export type Props = {
  isOnboarding?: boolean;
};

function FirstPage({ isOnboarding = false }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.firstPage",
  });
  const { navigateTo, navigateBack } = useNavigation();
  const { integration } = useIntegrationContext();
  const { ticketsCounter } = useTicketsContext();

  const handleClick = () => {
    logEvent("P10_getTicketBtn_click");

    navigateTo("/intro/step-3");
  };

  const handleSkip = () => {
    logEvent("P10_skipBtn_click");

    navigateTo("/causes");
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

  const title = isOnboarding ? titleOnboarding : t("title");

  const handleHasAccount = () => {
    logEvent("openAuthBtn_click", { from: "onboarding_page" });
    navigateTo("/auth/sign-in");
  };

  useEffect(() => {
    logEvent("P10_view");
  }, []);

  const hasCustomOnboarding =
    integration?.onboardingTitle && integration?.onboardingDescription;

  const renderCustomOnboarding = () => (
    <>
      <S.Title>{integration?.onboardingTitle}</S.Title>
      <S.Description>{integration?.onboardingDescription}</S.Description>
    </>
  );

  const renderFallbackOnboarding = () => (
    <>
      <S.Title>
        {ticketsCounter > 1 ? t("titlePlural", { ticketsCounter }) : title}
      </S.Title>
      <S.Description>{subtitle}</S.Description>
    </>
  );

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
          <S.Header>
            <MadeByRibonPill
              text={t("madeBy")}
              backgroundColor={theme.colors.brand.primary[50]}
            />
          </S.Header>
          <S.TextContainer>
            <S.IntegrationWrapper>
              <S.DefaultImage src={integration?.onboardingImage || Wrapper} />
              {!integration?.onboardingImage && (
                <S.IntegrationLogoWrapper>
                  <S.IntegrationLogo
                    src={integration?.logo || LogoBackgroundIcon}
                  />
                </S.IntegrationLogoWrapper>
              )}
            </S.IntegrationWrapper>
            {hasCustomOnboarding
              ? renderCustomOnboarding()
              : renderFallbackOnboarding()}
          </S.TextContainer>
          <S.ButtonContainer>
            <S.FilledButton onClick={handleClick}>
              {t("howItWorksButton")}
            </S.FilledButton>
            <Button
              text={t("skipButton")}
              textColor={theme.colors.brand.primary[600]}
              backgroundColor="transparent"
              borderColor={theme.colors.brand.primary[500]}
              borderRadius="4px"
              onClick={handleSkip}
            />

            {isOnboarding && (
              <S.Footer>
                <S.MutedText>{t("haveAnAccount")}</S.MutedText>
                <S.ClickableText onClick={handleHasAccount}>
                  {t("signIn")}
                </S.ClickableText>
              </S.Footer>
            )}
          </S.ButtonContainer>
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

export default FirstPage;
