import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CryptoSection from ".";

describe("CryptoSection", () => {
  it("should render without error", () => {
    renderComponent(<CryptoSection />);

    expectTextToBeInTheDocument("not available yet");
  });
});
