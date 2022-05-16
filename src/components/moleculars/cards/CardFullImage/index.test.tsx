import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardFullImage from ".";

describe("CardFullImage", () => {
  it("should render without error", () => {
    renderComponent(
      <CardFullImage roundImage="" title="CardFullImage" backgroundImage="" />,
    );

    expectTextToBeInTheDocument("CardFullImage");
  });
});
