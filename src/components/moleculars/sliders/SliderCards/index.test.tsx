import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SliderCards from ".";

describe("SliderCards", () => {
  it("should render without error", () => {
    renderComponent(
      <SliderCards scrollOffset={400}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </SliderCards>,
    );

    expectTextToBeInTheDocument("1");
  });
});
