import React from "react";
import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import CardFullImage from ".";

describe("CardFullImage", () => {
  it("should render without error", () => {
    const { component } = renderComponent(
      <CardFullImage
        roundImage="https://i.imgur.com/E1GNgB8.png"
        title="CardFullImage"
        backgroundImage="https://i.imgur.com/BwtK2hX.png"
        subtitle="subtitle"
      />,
    );

    expectTextToBeInTheDocument("CardFullImage");
    expectTextToBeInTheDocument("subtitle");
    expectImageToBeInTheDocument("logo");
    expect(component.container.firstChild).toHaveStyle(
      "background-image: url(https://i.imgur.com/BwtK2hX.png)",
    );
  });

  it("should show loading component", () => {
    renderComponent(
      <CardFullImage
        roundImage=""
        title="CardFullImage"
        backgroundImage=""
        loading
      />,
    );

    expect(screen.queryAllByTestId("spinner")).toHaveLength(1);
  });
});
