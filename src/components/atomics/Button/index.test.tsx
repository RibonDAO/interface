import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import ribon from "assets/icons/ribon.svg";
import theme from "styles/theme";
import Button from ".";

describe("<Button />", () => {
  it("renders the text", () => {
    renderComponent(<Button text="button" onClick={() => {}} />);

    expectTextToBeInTheDocument("button");
  });

  it("calls the passed function when clicked", () => {
    const mockFunction = jest.fn();
    renderComponent(<Button text="button" onClick={mockFunction} />);
    clickOn("button");

    expect(mockFunction).toHaveBeenCalled();
  });

  describe("when has ribons", () => {
    it("renders ribons icon when ribons is passed", () => {
      renderComponent(<Button text="button" onClick={() => {}} ribons />);
      expectTextToBeInTheDocument("ribon.svg");
    });
  });

  describe("when has a icon", () => {
    it("renders left Icon when leftIcon is passed", () => {
      renderComponent(
        <Button text="button" onClick={() => {}} leftIcon={ribon} />,
      );
      expectImageToBeInTheDocument("left icon");
    });

    it("renders right Icon when rightIcon is passed", () => {
      renderComponent(
        <Button text="button" onClick={() => {}} rightIcon={ribon} />,
      );
      expectImageToBeInTheDocument("right icon");
    });
  });

  describe("when has a specific style", () => {
    it("renders outline button", () => {
      renderComponent(<Button text="button" onClick={() => {}} outline />);
      expect(screen.getByText("button")).toHaveStyle(
        `color: ${theme.colors.ribonBlue};`,
      );
    });

    it("renders softDisabled button", () => {
      renderComponent(<Button text="button" onClick={() => {}} softDisabled />);
      expect(screen.getByText("button")).toHaveStyle(
        `color: ${theme.colors.darkGray};`,
      );
    });

    it("renders button with border radius when round is true", () => {
      renderComponent(<Button text="button" onClick={() => {}} round />);
      expect(screen.getByText("button")).toHaveStyle(" border-radius: 80px");
    });
  });
});
