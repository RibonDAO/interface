import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useOffers, useNonProfitImpact } from "@ribon.io/shared/hooks";
import {
  Offer,
  Currencies,
  NonProfit,
  Categories,
} from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { setLocalStorageItem } from "lib/localStorage";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import { formatImpact } from "lib/formatters/impactFormatter";
import * as S from "./styles";

const { tertiary } = theme.colors.brand;

type Props = {
  nonProfit: NonProfit | undefined;
  onOfferChange: (offer: Offer, index?: number) => void;
};

const CURRENT_OFFER_INDEX_KEY = "CURRENT_OFFER_INDEX_KEY";

function SelectOfferPage({ nonProfit, onOfferChange }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { currentCoin, setCurrentCoin } = usePaymentInformation();
  const { offers, refetch: refetchOffers } = useOffers(
    currentCoin,
    false,
    Categories.DIRECT_CONTRIBUTION,
  );

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.selectOfferSection",
  });

  const { nonProfitImpact, refetch: refetchNonProfitImpact } =
    useNonProfitImpact(nonProfit?.id, currentOffer?.priceValue, currentCoin);

  useEffect(() => {
    if (currentOffer) refetchNonProfitImpact();
  }, [currentOffer]);

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  useEffect(() => {
    setMaxRange(offers.length - 1);
    setCurrentOffer(offers[currentOfferIndex]);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) {
      const offerIndex = offers.findIndex(
        (offer) => offer.id === currentOffer.id,
      );

      onOfferChange(currentOffer, offerIndex);
    }
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
    setLocalStorageItem(CURRENT_OFFER_INDEX_KEY, currentOfferIndex.toString());
  }, [currentOfferIndex]);

  const onCurrencyChanged = (currency: Currencies) => {
    setCurrentCoin(currency);
    setCurrentOfferIndex(0);
  };

  const currentPrice = () =>
    currentOffer && formatPrice(currentOffer.priceValue, currentOffer.currency);

  const oldImpactFormat = () => (
    <S.CauseText>
      {currentPrice()} {t("fundText")}{" "}
      <S.CauseTextHighlight>
        {nonProfitImpact && formatImpact(nonProfitImpact.formattedImpact)}
      </S.CauseTextHighlight>
    </S.CauseText>
  );
  const renderCurrentBlock = () => oldImpactFormat();

  return (
    <S.Container>
      <S.Title>{nonProfit?.name}</S.Title>
      {renderCurrentBlock()}
      <S.ValueContainer>
        <S.ValueText>{currentPrice()}</S.ValueText>
        <S.CurrencySelectorContainer>
          <S.CurrencySelector
            values={[Currencies.BRL, Currencies.USD]}
            name="currency"
            onOptionChanged={onCurrencyChanged}
            defaultValue={currentCoin}
            containerId={`currency-selector-${nonProfit?.id}`}
            customInputStyles={{
              borderColor: tertiary[800],
              height: 40,
              marginBottom: 0,
              color: tertiary[800],
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
        color={tertiary[400]}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
