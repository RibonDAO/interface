import { useCallback, useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useTranslation } from "react-i18next";
import Cause from "types/entities/Cause";
import theme from "styles/theme";
import * as S from "./styles";

const { orange30, orange40 } = theme.colors;

type Props = {
  cause: Cause | undefined;
  onValueChange: (value: number) => void;
};

const values = [5, 10, 15, 20, 25, 50, 70, 100];
function SelectCryptoOfferSection({
  cause,
  onValueChange,
}: Props): JSX.Element {
  const [maxRange] = useState(values.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentValue = useCallback(() => values[currentIndex], [currentIndex]);

  useEffect(() => {
    onValueChange(currentValue());
  }, [currentValue]);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage.selectOfferSection",
  });

  return (
    <S.Container>
      <S.CauseText>
        {t("causeText")}{" "}
        <S.CauseTextHighlight>{cause?.name}</S.CauseTextHighlight>
      </S.CauseText>
      <S.ValueContainer>
        <S.ValueText>{currentValue()}</S.ValueText>
        <S.CurrencySelectorContainer>
          <S.CurrencySelector
            values={["USDC"]}
            name="currency"
            onOptionChanged={() => {}}
            defaultValue="USDC"
            containerId="currencies-dropdown"
            customInputStyles={{
              borderColor: orange40,
              height: 40,
              marginBottom: 0,
              color: orange40,
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
        color={orange30}
      />
    </S.Container>
  );
}

export default SelectCryptoOfferSection;
