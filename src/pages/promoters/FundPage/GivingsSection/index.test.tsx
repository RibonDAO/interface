import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GivingsSection from ".";

describe("GivingsSection", () => {
  it("should render without error", () => {
    renderComponent(<GivingsSection />);

    expectTextToBeInTheDocument("Your givings");
    expectTextToBeInTheDocument("All givings");
  });
});
