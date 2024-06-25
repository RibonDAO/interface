import { useTranslation } from "react-i18next";

import { theme } from "@ribon.io/shared/styles";
import { useWarmGlowMessages } from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import Button from "components/atomics/buttons/Button";
import GreenSun from "./assets/green-sun.svg";
import * as S from "./styles";
import BreathingFace from "./assets/breathing-face.svg";

function PostDonationPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationPage",
  });

  const { navigateTo } = useNavigation();
  const { warmGlowMessage, isLoading } = useWarmGlowMessages();

  const handleNavigate = () => {
    navigateTo("/causes");
  };

  return isLoading ? null : (
    <S.Container>
      <S.TopContainer>
        <S.BreathingFace src={BreathingFace} />
      </S.TopContainer>

      <S.ContentContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Description>{warmGlowMessage?.message}</S.Description>
      </S.ContentContainer>

      <S.ButtonContainer>
        <Button
          text={t("buttonText")}
          textColor={theme.colors.neutral10}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          borderRadius="12px"
          onClick={handleNavigate}
        />
      </S.ButtonContainer>
      <S.BackgroundSun>
        <S.GreenSun src={GreenSun} />
      </S.BackgroundSun>
    </S.Container>
  );
}

export default PostDonationPage;
