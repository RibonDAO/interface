import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import useOffers from "hooks/apiHooks/useOffers";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import Offer from "types/entities/Offer";
import { useTranslation } from "react-i18next";
import { Currencies } from "types/enums/Currencies";
import theme from "styles/theme";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { setLocalStorageItem } from "lib/localStorage";
import NonProfit from "types/entities/NonProfit";
import useNonProfitImpact from "hooks/apiHooks/useNonProfitImpact";
import * as S from "./styles";

const { red30, red40 } = theme.colors;

type Props = {
  nonProfit: NonProfit | undefined;
  onOfferChange: (offer: Offer) => void;
};

const CURRENT_OFFER_INDEX_KEY = "CURRENT_OFFER_INDEX_KEY";

function SelectOfferPage({ nonProfit, onOfferChange }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { currentCoin, setCurrentCoin } = useCardPaymentInformation();
  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.selectOfferSection",
  });

  const { formattedImpactText } = useFormattedImpactText();

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
    if (currentOffer) onOfferChange(currentOffer);
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

  return (
    <S.Container>
      <S.Title>{nonProfit?.name}</S.Title>
      <S.CauseText>
        {currentPrice()} {t("fundText")}{" "}
        <S.CauseTextHighlight>
          {formattedImpactText(
            nonProfit,
            undefined,
            true,
            true,
            nonProfitImpact,
          )}
        </S.CauseTextHighlight>
      </S.CauseText>
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
              borderColor: red40,
              height: 40,
              marginBottom: 0,
              color: red40,
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
        color={red30}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
