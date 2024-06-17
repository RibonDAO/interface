import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardMarginButtonImage from ".";

describe("CardMarginButtonImage", () => {
  const onFirstButtonClick = jest.fn();
  const onSecondButtonClick = jest.fn();

  beforeEach(() => {
    renderComponent(
      <CardMarginButtonImage
        firstButtonText="Button one"
        secondButtonText="Button two"
        onFirstButtonClick={onFirstButtonClick}
        onSecondButtonClick={onSecondButtonClick}
        topImage=""
        bottomImage=""
        description="CardMarginButtonImage"
      />,
    );
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("CardMarginButtonImage");
    expectTextToBeInTheDocument("Button one");
    expectTextToBeInTheDocument("Button two");
  });

  it("should call onFirstButtonClick when first button is clicked", () => {
    clickOn("Button one");
    expect(onFirstButtonClick).toHaveBeenCalled();
  });

  it("should call onSecondButtonClick when second button is clicked", () => {
    clickOn("Button two");
    expect(onSecondButtonClick).toHaveBeenCalled();
  });
});
