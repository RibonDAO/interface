import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-sun-shape.svg";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { RIBON_COMPANY_ID } from "utils/constants";
import Button from "components/atomics/buttons/Button";

import { theme } from "@ribon.io/shared/styles";
import RibonLogo from "assets/images/logo-ribon.svg";
import ArrowLeft from "assets/icons/arrow-left-green.svg";
import * as S from "./styles";
import TicketIllustration from "./assets/ticket-illustration.svg";

function SecondPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.secondPage",
  });
  const { navigateTo, navigateBack } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const handleClick = () => {
    navigateTo("/intro/step-3");
  };

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  return (
    <S.Container>
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.BackArrowButton src={ArrowLeft} onClick={() => navigateBack()} />
          <S.Header>
            <S.LogosWrapper>
              <S.Logo src={RibonLogo} alt="ribon-logo" />
              {!isRibonIntegration && (
                <>
                  <S.ImageContainerText>+</S.ImageContainerText>
                  <S.Logo src={integration?.logo} alt="integration-logo" />
                </>
              )}
            </S.LogosWrapper>
          </S.Header>
          <S.TextContainer>
            <S.DefaultImage src={TicketIllustration} />
            <S.Title>{t("title")}</S.Title>
            <S.Description>{t("subtitle")}</S.Description>
          </S.TextContainer>
          <S.ButtonContainer>
            <Button
              text={t("button")}
              backgroundColor={theme.colors.brand.primary[600]}
              borderColor={theme.colors.brand.primary[600]}
              borderRadius="4px"
              onClick={handleClick}
            />
          </S.ButtonContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default SecondPage;
