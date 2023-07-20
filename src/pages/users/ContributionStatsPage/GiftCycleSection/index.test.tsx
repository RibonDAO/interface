import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import GiftCycleSection from "pages/users/ContributionStatsPage/GiftCycleSection/index";

describe("GiftCycleSection", () => {
  it("renders without error", () => {
    renderComponent(<GiftCycleSection />);

    expectTextToBeInTheDocument("Updated in real time");
    expectImageToBeInTheDocument("gift-donation-cycle");
  });
});
