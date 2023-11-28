import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import AppleLogin from ".";

const onContinue = jest.fn();
describe("AppleLogin", () => {
  it("should render without error", () => {
    renderComponent(<AppleLogin onContinue={onContinue} />);

    expectTextToBeInTheDocument("Continue with Apple");
  });
});
