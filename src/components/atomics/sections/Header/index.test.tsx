import { renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import Header from ".";

describe("Header", () => {
  it("should render without error", () => {
    renderComponent(<Header />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  describe("when it has a right component", () => {
    beforeEach(() => {
      renderComponent(<Header rightComponent={<div>right</div>} />);
    });

    it("shows the right component", () => {
      expectTextToBeInTheDocument("right");
    });
  });

  describe("when it has a back button", () => {
    const mockFn = jest.fn();

    beforeEach(() => {
      renderComponent(<Header hasBackButton onBackButtonClick={mockFn} />);
    });

    it("shows the back button", () => {
      expectImageToBeInTheDocument("back-button");
    });

    it("calls the mockFn on back button click", () => {
      screen.getByAltText("back-button").click();

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("when it has a side logo", () => {
    beforeEach(() => {
      const sidelogo = "src/assets/images/heart.svg";
      renderComponent(<Header sideLogo={sidelogo} />);
    });

    it("shows the side logo image", () => {
      expectImageToBeInTheDocument("side-logo");
    });
  });
});
