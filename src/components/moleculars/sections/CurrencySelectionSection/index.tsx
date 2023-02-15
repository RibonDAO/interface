import Dropdown from "components/atomics/Dropdown";
import { Currencies } from "@ribon.io/shared/types";
import * as S from "./styles";

export type Props = {
  amount: number;
  onCurrencyChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentCoin: Currencies;
  currencyOptions: Currencies[];
};

function CurrencySelectionSection({
  amount,
  currentCoin,
  currencyOptions,
  onCurrencyChanged,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.Amount>
        {currentCoin} {amount}
      </S.Amount>
      <S.DropdownWrapper>
        <Dropdown
          values={currencyOptions}
          name="currency"
          onOptionChanged={onCurrencyChanged}
          defaultValue={currentCoin}
          containerId="currencies-dropdown"
        />
      </S.DropdownWrapper>
    </S.Container>
  );
}

export default CurrencySelectionSection;
