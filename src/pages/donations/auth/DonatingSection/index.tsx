import { NonProfit } from "@ribon.io/shared/types";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageWithIconOverlay from "components/atomics/ImageWithIconOverlay";
import * as S from "./styles";
import GreenSun from "./assets/GreenSun";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
  shouldRepeatAnimation: boolean;
};
function DonatingSection({
  nonProfit,
  onAnimationEnd,
  shouldRepeatAnimation,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donatingSection",
  });
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const [goToNextScreen, setGoToNextScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setGoToNextScreen(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!shouldRepeatAnimation && goToNextScreen) {
      onAnimationEnd();
    }
  }, [shouldRepeatAnimation, goToNextScreen]);

  useEffect(() => {
    document.body.style.pointerEvents = "none";

    return () => {
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  return (
    <S.Container>
      <S.AnimationContainer>
        <GreenSun />
      </S.AnimationContainer>
      <S.BottomContainer>
        <ImageWithIconOverlay
          leftImage={profile?.photo}
          rightImage={nonProfit?.icon}
        />
        <S.LoadingContainer>
          <S.LoadingText>{t("loadingText")}</S.LoadingText>
        </S.LoadingContainer>
      </S.BottomContainer>
    </S.Container>
  );
}

export default DonatingSection;
