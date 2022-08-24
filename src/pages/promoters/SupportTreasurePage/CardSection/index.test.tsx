import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectDisplayValueToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CardSection from ".";

describe("CardSection", () => {
  it("should render without error", () => {
    renderComponent(<CardSection />);

    expectTextToBeInTheDocument("Choose your giving");
  });

  it("should change the current coin", () => {
    renderComponent(<CardSection />);

    clickOn("Currency");
    clickOn("BRL");

    expectDisplayValueToBeInTheDocument("BRL");
  });

  it("should change the current section", async () => {
    renderComponent(<CardSection />);
    await waitForPromises();

    clickOn("Next");

    expectTextToBeInTheDocument("Billing information");
  });
});
