import { useTranslation } from "react-i18next";
import { Currencies } from "types/enums/Currencies";
import useCardGivingFees from "hooks/apiHooks/useCardGivingFees";
import * as S from "../styles";

type Props = {
  givingValue: number;
  currency: Currencies;
  givingTotal: string;
};
function FeesSection({
  givingValue,
  currency,
  givingTotal,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage.cardSection",
  });

  const { cardGivingFees, isLoading: loadingFees } = useCardGivingFees(
    givingValue,
    currency,
  );

  return (
    <>
      <S.Subtitle>{t("detailsSubtitle")}</S.Subtitle>
      <S.GivingValue>{givingTotal}</S.GivingValue>
      <S.NetGivingValue>
        {t("netGivingText", {
          netGiving: loadingFees ? "..." : cardGivingFees?.netGiving,
        })}
      </S.NetGivingValue>
      <S.ServiceFeesValue>
        {t("serviceFeesText", {
          serviceFees: loadingFees ? "..." : cardGivingFees?.serviceFees,
        })}
      </S.ServiceFeesValue>
      <S.CryptoGivingValue>
        {t("cryptoValueText", {
          cryptoGivings: loadingFees ? "..." : cardGivingFees?.cryptoGiving,
        })}
      </S.CryptoGivingValue>
    </>
  );
}

export default FeesSection;
