import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardSideImageButton from "./index";

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
});
