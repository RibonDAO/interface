import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useOffers } from "@ribon.io/shared/hooks";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { Offer, Cause, Currencies } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { useLocationSearch } from "hooks/useLocationSearch";
import * as S from "./styles";

const { secondary } = theme.colors.brand;

type Props = {
  cause: Cause | undefined;
  onOfferChange: (offer: Offer, index?: number) => void;
};

const CURRENT_OFFER_INDEX_KEY = "CURRENT_OFFER_INDEX_KEY";

function SelectOfferPage({ cause, onOfferChange }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);
  const { updateLocationSearch } = useLocationSearch();

  const defaultCurrentOfferIndex = () => {
    const localstorageIndex = getLocalStorageItem(CURRENT_OFFER_INDEX_KEY);
    if (localstorageIndex) return Number(localstorageIndex);

    return 0;
  };

  const [currentOfferIndex, setCurrentOfferIndex] = useState(
    defaultCurrentOfferIndex(),
  );
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
    setCurrentOffer(offers[currentOfferIndex]);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) onOfferChange(currentOffer, currentOfferIndex);
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
    setLocalStorageItem(CURRENT_OFFER_INDEX_KEY, currentOfferIndex.toString());
  }, [currentOfferIndex]);

  const onCurrencyChanged = (currency: Currencies) => {
    if (currency === Currencies.USDC) {
      updateLocationSearch("payment_method", "crypto");
    } else {
      setCurrentCoin(currency);
      setCurrentOfferIndex(0);
    }
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
            values={[Currencies.BRL, Currencies.USD, Currencies.USDC]}
            name="currency"
            onOptionChanged={onCurrencyChanged}
            defaultValue={currentCoin}
            containerId="currencies-dropdown"
            customInputStyles={{
              borderColor: secondary[700],
              height: 40,
              marginBottom: 0,
              color: secondary[700],
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
        color={secondary[400]}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
