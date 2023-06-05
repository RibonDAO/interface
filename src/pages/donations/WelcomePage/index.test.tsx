import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

import WelcomePage from ".";

describe("WelcomePage", () => {
  it("should render without error", () => {
    renderComponent(<WelcomePage />);
    expectTextToBeInTheDocument("Your donation ticket is available");
    expectTextToBeInTheDocument("Get my ticket");
  });
});
