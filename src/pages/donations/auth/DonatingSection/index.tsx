import { NonProfit } from "@ribon.io/shared/types";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageWithIconOverlay from "components/atomics/ImageWithIconOverlay";
import LottieAnimation from "components/atomics/LottieAnimation";
import donationAnimation from "./assets/donationAnimation.json";
import * as S from "./styles";

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
  const [startFrame, setStartFrame] = useState(0);

  function getRandomFrame() {
    // frame 0 -> inicio
    // frame 63 -> seringa
    // frame 110 -> medicamento
    // frame 136 -> pintinho
    // frame 239 -> final
    const frames = [0, 63, 110, 136];
    return frames[Math.floor(Math.random() * frames.length)];
  }

  useEffect(() => {
    setTimeout(() => {
      setGoToNextScreen(true);
    }, 4500);
    setStartFrame(getRandomFrame());
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
        <LottieAnimation
          animationData={donationAnimation}
          width={360}
          height={360}
          startFrame={startFrame}
        />
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
