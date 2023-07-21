import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import UserSupportBanner from ".";

describe("UserSupportBanner", () => {
  it("should render without error", () => {
    renderComponent(<UserSupportBanner from="test" />);

    expectTextToBeInTheDocument("Access user support");
    expectTextToBeInTheDocument("Questions, ideias, refunds. We’re here!");
  });
});
