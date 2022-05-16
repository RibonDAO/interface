import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ButtonRound from ".";

describe("<ButtonRound />", () => {
  it("renders the text", () => {
    renderComponent(<ButtonRound text="buttonRound" onClick={() => {}} />);

    expectTextToBeInTheDocument("buttonRound");
  });

  it("calls the passed function when clicked", () => {
    const mockFunction = jest.fn();
    renderComponent(<ButtonRound text="buttonRound" onClick={mockFunction} />);
    clickOn("buttonRound");

    expect(mockFunction).toHaveBeenCalled();
  });
});
