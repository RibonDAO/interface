import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import AppleSection from ".";

const onContinue = jest.fn();
describe("AppleSection", () => {
  it("should render without error", () => {
    renderComponent(<AppleSection onContinue={onContinue} />);

    expectTextToBeInTheDocument("Continue with Apple");
  });
});
