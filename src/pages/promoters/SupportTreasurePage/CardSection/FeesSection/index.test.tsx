import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Currencies } from "types/enums/Currencies";
import FeesSection from ".";

describe("FeesSection", () => {
  it("should render without error", () => {
    renderComponent(
      <FeesSection
        givingTotal="$1.00"
        givingValue={3}
        setCryptoGiving={jest.fn()}
        currency={Currencies.USD}
      />,
    );

    expectTextToBeInTheDocument("Giving details");
  });
});
