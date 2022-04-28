import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import CardEmptySection from ".";

describe("CardEmptySection", () => {
  it("should render card text", () => {
    renderComponent(
      <CardEmptySection cardText="cardTextTest" btnText="hello" />,
    );

    expectTextToBeInTheDocument("cardTextTest");
  });

  it("should render button text", () => {
    renderComponent(
      <CardEmptySection cardText="hi" btnText="buttonTextTest" />,
    );

    expectTextToBeInTheDocument("buttonTextTest");
  });
});
