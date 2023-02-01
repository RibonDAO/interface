import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectImageNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import theme from "styles/theme";
import CardSideImageButton from "./index";

const { primary } = theme.colors.brand;

describe("CardSideImageButton", () => {
  it("should render without error", () => {
    renderComponent(
      <CardSideImageButton
        buttonText="text"
        onClick={() => {}}
        icon=""
        title="title"
      />,
    );

    expectTextToBeInTheDocument("text");
  });

  it("should render with a description", () => {
    renderComponent(
      <CardSideImageButton
        buttonText="text"
        onClick={() => {}}
        icon=""
        title="title"
        description="description"
      />,
    );

    expectTextToBeInTheDocument("description");
  });

  it("should render with a counter", () => {
    renderComponent(
      <CardSideImageButton
        buttonText="text"
        onClick={() => {}}
        icon=""
        title="title"
        counter={549}
      />,
    );

    expectTextToBeInTheDocument("549");
  });

  it("should display ribons amount", () => {
    renderComponent(
      <CardSideImageButton
        onClick={() => {}}
        icon=""
        title="title"
        ribons={100}
      />,
    );

    expectTextToBeInTheDocument("100");
  });

  describe("when has collected state", () => {
    it("renders display button icon", () => {
      renderComponent(
        <CardSideImageButton
          onClick={() => {}}
          icon=""
          title="title"
          buttonText="text"
          isCollected
        />,
      );

      expectImageToBeInTheDocument("left icon");
    });

    it("should call function when click in primary button", () => {
      const handleClick = jest.fn();

      renderComponent(
        <CardSideImageButton
          onClick={handleClick}
          icon=""
          title="title"
          buttonText="text"
          isCollected
        />,
      );

      clickOn("text");

      expect(handleClick).toHaveBeenCalled();
    });

    it("renders correct text color", () => {
      renderComponent(
        <CardSideImageButton
          onClick={() => {}}
          icon=""
          title="title"
          buttonText="text"
          isCollected
        />,
      );

      expect(screen.getByText("text")).toHaveStyle(`color: ${primary[300]};`);
    });

    it("renders correct background color", () => {
      renderComponent(
        <CardSideImageButton
          onClick={() => {}}
          icon=""
          title="title"
          buttonText="text"
          isCollected
        />,
      );

      expect(screen.getByText("text")).toHaveStyle(
        `background-color: ${theme.colors.neutral10};`,
      );
    });
  });

  describe("when has not collected state", () => {
    it("should not render display button icon", () => {
      renderComponent(
        <CardSideImageButton
          onClick={() => {}}
          icon=""
          title="title"
          buttonText="text"
        />,
      );

      expectImageNotToBeInTheDocument("left icon");
    });

    it("renders correct text color", () => {
      renderComponent(
        <CardSideImageButton
          onClick={() => {}}
          icon=""
          title="title"
          buttonText="text"
          isCollected
        />,
      );

      expect(screen.getByText("text")).toHaveStyle(`color: ${primary[300]};`);
    });

    it("renders correct background color", () => {
      renderComponent(
        <CardSideImageButton
          onClick={() => {}}
          icon=""
          title="title"
          buttonText="text"
          isCollected
        />,
      );

      expect(screen.getByText("text")).toHaveStyle(
        `background-color: ${theme.colors.neutral10};`,
      );
    });
  });
});
