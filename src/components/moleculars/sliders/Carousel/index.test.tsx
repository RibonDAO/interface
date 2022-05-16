import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Carousel from ".";

describe("Carousel", () => {
  it("should render without error", () => {
    renderComponent(
      <Carousel>
        <div>1</div>
        <div>2</div>
      </Carousel>,
    );

    expectTextToBeInTheDocument("1");
  });
});
