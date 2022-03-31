import {
  clickOn,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
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
