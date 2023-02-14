import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Currencies } from "@ribon.io/shared/types";
import FeesSection from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCardGivingFees: () => ({
    cardGivingFees: { netGiving: 5, serviceFees: 5, cryptoGiving: "$5" },
    refetch: jest.fn(),
  }),
}));
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
