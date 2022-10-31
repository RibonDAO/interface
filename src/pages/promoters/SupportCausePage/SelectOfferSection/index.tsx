import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import useOffers from "hooks/apiHooks/useOffers";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import Offer from "types/entities/Offer";
import { useTranslation } from "react-i18next";
import Cause from "types/entities/Cause";
import * as S from "./styles";

type Props = {
  cause: Cause | undefined;
  onOfferChange: (offer: Offer) => void;
};
function SelectOfferPage({ cause, onOfferChange }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { currentCoin } = useCardPaymentInformation();
  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage.selectOfferSection",
  });

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  useEffect(() => {
    setMaxRange(offers.length - 1);
    setCurrentOffer(offers[0]);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) onOfferChange(currentOffer);
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
  }, [currentOfferIndex]);

  return (
    <S.Container>
      <S.CauseText>{t("causeText", { cause: cause?.name })} </S.CauseText>
      <S.ValueContainer>
        <S.ValueText>{currentOffer?.priceValue}</S.ValueText>
        <S.CurrencyText>{currentCoin}</S.CurrencyText>
      </S.ValueContainer>
      <InputRange
        value={currentOfferIndex}
        min={0}
        max={maxRange}
        onChange={(event) => {
          setCurrentOfferIndex(event.target.value);
        }}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
