import GiftDonationCycle from "assets/animations/gift-donation-cycle.gif";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

function GiftCycleSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.giftCycleSection",
  });

  return (
    <S.Container>
      <S.RealTimeDonationContainer>
        <S.RealTimeDonationLabel>
          {t("realTimeDonationLabel")}
        </S.RealTimeDonationLabel>
      </S.RealTimeDonationContainer>
      <S.GiftCard>
        <S.GiftDonationCycleImage
          src={GiftDonationCycle}
          alt="gift-donation-cycle"
        />
      </S.GiftCard>
    </S.Container>
  );
}

export default GiftCycleSection;
