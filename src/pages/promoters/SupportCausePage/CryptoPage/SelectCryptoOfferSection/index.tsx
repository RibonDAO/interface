import { useCallback, useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useTranslation } from "react-i18next";
import Cause from "types/entities/Cause";
import theme from "styles/theme";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { Currencies } from "@ribon.io/shared/types";
import { useLocationSearch } from "hooks/useLocationSearch";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import * as S from "./styles";

const { secondary } = theme.colors.brand;

type Props = {
  cause: Cause | undefined;
  onValueChange: (value: number) => void;
};

function SelectCryptoOfferSection({
  cause,
  onValueChange,
}: Props): JSX.Element {
  const values = [5, 10, 15, 20, 25, 50, 70, 100];

  const [maxRange] = useState(values.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { tokenSymbol, amount, setAmount } = useCryptoPayment();
  const { updateLocationSearch } = useLocationSearch();
  const { setCurrentCoin } = useCardPaymentInformation();

  const currentValue = useCallback(() => values[currentIndex], [currentIndex]);

  useEffect(() => {
    onValueChange(currentValue());
  }, [currentValue]);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage.selectOfferSection",
  });

  const onCurrencyChanged = (currency: Currencies) => {
    if (currency !== tokenSymbol) {
      setCurrentCoin(currency);
      updateLocationSearch("payment_method", "card");
    }
  };

  return (
    <S.Container>
      <S.CauseText>
        {t("causeText")}{" "}
        <S.CauseTextHighlight>{cause?.name}</S.CauseTextHighlight>
      </S.CauseText>
      <S.ValueContainer>
        <S.ValueInputContainer>
          <S.ValueInput
            value={amount}
            name="value-input"
            onChange={(event) => setAmount(event.target.value)}
          />
        </S.ValueInputContainer>
        <S.CurrencySelectorContainer>
          <S.CurrencySelector
            values={[Currencies.BRL, Currencies.USD, tokenSymbol]}
            name="currency"
            onOptionChanged={onCurrencyChanged}
            defaultValue={tokenSymbol}
            containerId="currencies-dropdown"
            customInputStyles={{
              borderColor: secondary[700],
              height: 40,
              marginBottom: 0,
              color: secondary[700],
              width: 92,
            }}
          />
        </S.CurrencySelectorContainer>
      </S.ValueContainer>
      <InputRange
        value={currentIndex}
        min={0}
        max={maxRange}
        onChange={(event) => {
          setCurrentIndex(event.target.value);
        }}
        color={secondary[400]}
      />
    </S.Container>
  );
}

export default SelectCryptoOfferSection;
