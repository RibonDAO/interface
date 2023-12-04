import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockLogEventFunction } from "setupTests";
import MagicLinkLogin from ".";

describe("MagicLinkLogin", () => {
  it("should render without error", () => {
    renderComponent(
      <MagicLinkLogin onContinue={() => ({})} from="direct_flow" />,
    );

    expectTextToBeInTheDocument("Continue with e-mail");
  });

  it("should fire a event when click on button", () => {
    const onContinue = jest.fn();
    renderComponent(
      <MagicLinkLogin onContinue={onContinue} from="direct_flow" />,
    );

    clickOn("Continue with e-mail");

    expect(mockLogEventFunction).toHaveBeenCalledWith("authEmailBtn_click", {
      from: "direct_flow",
    });
    expect(onContinue).toHaveBeenCalled();
  });
});
