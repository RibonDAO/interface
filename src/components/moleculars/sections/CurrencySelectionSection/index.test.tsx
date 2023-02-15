import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Currencies } from "@ribon.io/shared/types";
import CurrencySelectionSection from ".";

describe("CurrencySelectionSection", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <CurrencySelectionSection
        amount={100}
        currentCoin={Currencies.USD}
        onCurrencyChanged={mockFn}
        currencyOptions={[Currencies.USD, Currencies.BRL]}
      />,
    );
  });

  it("Shows amount properly", () => {
    expectTextToBeInTheDocument("USD 100");
  });
});
