import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import useOffers from "hooks/apiHooks/useOffers";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import Offer from "types/entities/Offer";
import { useTranslation } from "react-i18next";
import Cause from "types/entities/Cause";
import { Currencies } from "types/enums/Currencies";
import theme from "styles/theme";
import { formatPrice } from "lib/formatters/currencyFormatter";
import * as S from "./styles";

const { orange30, orange40 } = theme.colors;

type Props = {
  cause: Cause | undefined;
  onOfferChange: (offer: Offer) => void;
};
function SelectOfferPage({ cause, onOfferChange }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { currentCoin, setCurrentCoin } = useCardPaymentInformation();
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
    setCurrentOfferIndex(0);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) onOfferChange(currentOffer);
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
  }, [currentOfferIndex]);

  const onCurrencyChanged = (currency: Currencies) => {
    setCurrentCoin(currency);
  };

  return (
    <S.Container>
      <S.CauseText>
        {t("causeText")}{" "}
        <S.CauseTextHighlight>{cause?.name}</S.CauseTextHighlight>
      </S.CauseText>
      <S.ValueContainer>
        <S.ValueText>
          {currentOffer &&
            formatPrice(currentOffer.priceValue, currentOffer.currency)}
        </S.ValueText>
        <S.CurrencySelectorContainer>
          <S.CurrencySelector
            values={[Currencies.BRL, Currencies.USD]}
            name="currency"
            onOptionChanged={onCurrencyChanged}
            defaultValue={currentCoin}
            containerId="currencies-dropdown"
            customInputStyles={{
              borderColor: orange40,
              height: 40,
              marginBottom: 0,
              color: orange40,
              width: 80,
            }}
          />
        </S.CurrencySelectorContainer>
      </S.ValueContainer>
      <InputRange
        value={currentOfferIndex}
        min={0}
        max={maxRange}
        onChange={(event) => {
          setCurrentOfferIndex(event.target.value);
        }}
        color={orange30}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
