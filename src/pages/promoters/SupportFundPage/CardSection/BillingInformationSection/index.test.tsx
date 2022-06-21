import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import BillingInformationSection from ".";

describe("BillingInformationSection", () => {
  it("should render without error", () => {
    renderComponent(<BillingInformationSection />);

    expectTextToBeInTheDocument("Billing information");
  });
});
