import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardPartners from ".";

describe("CardLargeImage", () => {
  it("renders without error", () => {
    renderComponent(<CardPartners />);

    expectTextToBeInTheDocument("Ribon partners");
  });

  it("when cta is clicked", () => {
    const mockWindowOpen = jest.spyOn(window, "open").mockImplementation();
    renderComponent(<CardPartners />);

    clickOn("I want to help ->");

    expect(mockWindowOpen).toBeCalledWith(
      "https://projetos.ribon.io/partners",
      "_blank",
    );
  });
});
