import { useTranslation } from "react-i18next";
import { Currencies } from "@ribon.io/shared/types";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { useEffect } from "react";
import * as S from "../styles";

type Props = {
  givingValue: number;
  currency: Currencies;
  givingTotal: string;
  setCryptoGiving: (cryptoGiving: string) => void;
};

function FeesSection({
  givingValue,
  currency,
  givingTotal,
  setCryptoGiving,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection",
  });

  const {
    cardGivingFees,
    isLoading: loadingFees,
    refetch,
  } = useCardGivingFees(givingValue, currency);

  useEffect(() => {
    refetch();
    setCryptoGiving(cardGivingFees?.cryptoGiving.replace("$", "") ?? "");
  }, [givingValue, cardGivingFees, currency]);

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
