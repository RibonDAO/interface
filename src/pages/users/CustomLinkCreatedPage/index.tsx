import { useCallback, useEffect, useState } from "react";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";
import theme from "styles/theme";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Integration } from "@ribon.io/shared/types";
import { logError } from "services/crashReport";
import { useAuthentication } from "contexts/authenticationContext";
import useUserIntegration from "hooks/userHooks/useUserIntegration";
import { APP_LINK } from "utils/constants";
import Link from "./assets/link.svg";
import * as S from "./styles";

interface Instruction {
  emoji: string;
  title: string;
  description: string;
}

function CustomLinkCreatedPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "customLinkCreatedPage",
  });
  const { navigateTo } = useNavigation();

  const [copied, setCopied] = useState<boolean>(false);
  const [integration, setIntegration] = useState<Integration | null>(null);

  const { getUserIntegration } = useUserIntegration();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigateTo("/sign-in-custom-link");
    } else {
      getUserIntegration().then((userIntegration) => {
        if (!userIntegration) {
          navigateTo("/custom-link");
        }
      });
    }
  }, []);

  useEffect(() => {
    const fetchUserIntegration = async () => {
      try {
        const userIntegration = await getUserIntegration();
        setIntegration(userIntegration);
      } catch (error) {
        logError(error);
        navigateTo("/custom-link");
      }
    };

    fetchUserIntegration();
  }, []);

  const finalLink = useCallback(() => {
    if (!integration) return "";

    return `${APP_LINK}?integration_id=${integration.uniqueAddress}`;
  }, [integration]);

  const copyTextToClipboard = () => {
    const text = finalLink();
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleBackToApp = () => {
    navigateTo("/causes");
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  const instructionItems = [
    {
      emoji: t("instruction1.emoji"),
      title: t("instruction1.title"),
      description: t("instruction1.description"),
    },
    {
      emoji: t("instruction2.emoji"),
      title: t("instruction2.title"),
      description: t("instruction2.description"),
    },
  ] as Instruction[];

  return (
    <S.Container>
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.TextContainer>
            <S.DefaultImage src={Link} />
            {integration && <S.LogoImage src={integration.logo} />}
            <S.Title>{t("title")}</S.Title>
            <S.Description>{t("description")}</S.Description>
            <InputText name="integration_link" value={finalLink()} disabled />
            <Button
              type="button"
              onClick={copyTextToClipboard}
              text={copied ? t("copiedLink") : t("copyLink")}
              backgroundColor={theme.colors.brand.primary[600]}
              data-testid="copyLink"
            />
            <S.Divider />
          </S.TextContainer>
        </S.ContentContainer>
        <S.InstructionsContainer>
          <S.InstructionsTitle>{t("instructionsTitle")}</S.InstructionsTitle>
          <S.ScrollableContainer>
            <S.InstructionsList>
              {instructionItems.map((instruction) => (
                <S.Instruction key={instruction.emoji}>
                  <S.Emoji>{instruction.emoji}</S.Emoji>
                  <S.Title>{instruction.title}</S.Title>
                  <S.InstructionDescription>
                    {instruction.description}
                  </S.InstructionDescription>
                </S.Instruction>
              ))}
            </S.InstructionsList>
          </S.ScrollableContainer>
        </S.InstructionsContainer>

        <S.ContentContainer>
          <Button
            type="button"
            onClick={handleBackToApp}
            text={t("backToApp")}
            backgroundColor={theme.colors.brand.primary[600]}
            data-testid="backToAppLink"
          />
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default CustomLinkCreatedPage;
