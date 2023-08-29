import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import MonthlyContributionsPage from ".";
import offerFactory from "config/testUtils/factories/offerFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";

const mockSubscription = {
  id: 1,
  status: "active",
  offer: offerFactory(),
  receiver: nonProfitFactory(),
};

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useSubscriptions: () => ({
    userSubscriptions: () => ({ subscriptions: [mockSubscription] }),
    refetch: jest.fn(),
  }),
}));

describe("MonthlyContributionsPage", () => {
  it("should render without error", () => {
    renderComponent(<MonthlyContributionsPage />);

    expectTextToBeInTheDocument("Monthly contributions");
  });

  it("should have offer price", () => {
    renderComponent(<MonthlyContributionsPage />);

    expectTextToBeInTheDocument(mockSubscription.offer.price);
  });

  it("should open modal cancel subscription modal", () => {
    renderComponent(<MonthlyContributionsPage />);

    screen.getByTestId("cancel-subscription").click();

    expectTextToBeInTheDocument("Cancel monthly contribution");
  });
});
