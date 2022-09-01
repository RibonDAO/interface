import { renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import promoterDonationFactory from "config/testUtils/factories/promoterDonationFactory";
import { formatToDecimals } from "lib/web3Helpers/etherFormatters";
import { mockGraphqlRequest } from "config/testUtils/test-helper";
import { ALL_PROMOTERS_DONATIONS_QUERY_NAME } from "services/apiTheGraph/querys/promoterDonation";
import AllGivingsSection from ".";

describe("AllGivingsSection", () => {
  it("should render without error", () => {
    renderComponent(<AllGivingsSection />);

    expectTextToBeInTheDocument("All givings");
  });

  describe("when the treasure has givings", () => {
    beforeEach(async () => {
      const fiftyCentInDecimals = formatToDecimals(0.5).toFixed(2);
      mockGraphqlRequest(ALL_PROMOTERS_DONATIONS_QUERY_NAME, {
        promoterDonations: [
          promoterDonationFactory({
            amountDonated: fiftyCentInDecimals,
          }),
        ],
      });

      renderComponent(<AllGivingsSection />);

      await waitForPromises();
    });

    it("shows the global givings", async () => {
      const text = "See transaction";
      const date = new Date("5/18/2022");
      const amount = "0.50";

      expectTextToBeInTheDocument(text);
      expectTextToBeInTheDocument(date.toLocaleDateString());
      expectTextToBeInTheDocument(amount);
    });
  });
});
