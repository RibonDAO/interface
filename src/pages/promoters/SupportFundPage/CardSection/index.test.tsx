import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardSection from ".";

describe("CardSection", () => {
  it("should render without error", () => {
    renderComponent(<CardSection />);

    expectTextToBeInTheDocument("Choose your giving");
  });
});
