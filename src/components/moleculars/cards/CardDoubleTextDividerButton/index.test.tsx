import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import CardDoubleTextDividerButton from "./index";

describe("CardDoubleTextDividerButton", () => {
  it("should render without error", () => {
    renderComponent(
      <CardDoubleTextDividerButton
        firstText="22/02/2022"
        mainText="12.00"
        rightComplementText="USDC"
        buttonText="see transaction"
        rightComponentButton="test"
        link=""
      />,
    );
    expectTextToBeInTheDocument("22/02/2022");
    expectTextToBeInTheDocument("12.00");
    expectTextToBeInTheDocument("USDC");
  });
});
