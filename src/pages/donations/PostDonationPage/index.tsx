import { useTranslation } from "react-i18next";

import { theme } from "@ribon.io/shared/styles";
import { useWarmGlowMessages } from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import Button from "components/atomics/buttons/Button";
import LottieAnimation from "components/atomics/LottieAnimation";

import * as S from "./styles";

import postDonationAnimation from "./assets/breathingFace.json";
import sunAnimation from "./assets/green-sun.json";

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
        <LottieAnimation
          animationData={postDonationAnimation}
          width={428}
          height={428}
        />
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
        <LottieAnimation
          animationData={sunAnimation}
          width="100%"
          height={262}
        />
      </S.BackgroundSun>
    </S.Container>
  );
}

export default PostDonationPage;
