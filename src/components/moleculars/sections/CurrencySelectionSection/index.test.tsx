import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Currencies } from "types/enums/Currencies";
import CurrencySelectionSection from ".";

describe("CurrencySelectionSection", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <CurrencySelectionSection
        amount={100}
        currentCoin={Currencies.USD}
        onCurrencyChanged={mockFn}
        currencyOptions={[Currencies.USD, Currencies.BRL, Currencies.USDT]}
      />,
    );
  });

  it("Shows amount properly", () => {
    expectTextToBeInTheDocument("USD 100");
  });
});
