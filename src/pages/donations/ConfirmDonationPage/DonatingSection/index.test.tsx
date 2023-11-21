import { renderComponent } from "config/testUtils";
import DonatingSection from "pages/donations/ConfirmDonationPage/DonatingSection/index";
import { nonProfitFactory } from "@ribon.io/shared/config";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

describe("DonatingSection", () => {
  const nonProfit = nonProfitFactory();
  const mockFn = jest.fn();

  it("renders without error", () => {
    renderComponent(
      <DonatingSection nonProfit={nonProfit} onAnimationEnd={mockFn} />,
    );

    expectTextToBeInTheDocument("Making donation...");
  });
});