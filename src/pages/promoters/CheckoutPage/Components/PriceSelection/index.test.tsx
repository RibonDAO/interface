import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import PriceSelection from ".";

const mockOffer = offerFactory({
  price: "$10.00",
});

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCardGivingFees: () => ({
    cardGivingFees: { netGiving: 5, serviceFees: 5 },
    refetch: jest.fn(),
  }),
}));

describe("PriceSelection", () => {
  it("should render without error", () => {
    renderComponent(
      <PriceSelection currentOffer={mockOffer} onEditClick={() => {}} />,
    );

    expectTextToBeInTheDocument("$10.00");
  });
});
