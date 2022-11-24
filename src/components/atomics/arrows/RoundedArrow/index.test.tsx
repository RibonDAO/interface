import React from "react";
import { renderComponent } from "config/testUtils";
import RoundedArrow from ".";

describe("RoundedArrow", () => {
  it("should render without error", () => {
    const result = renderComponent(
      <RoundedArrow direction="left" onClick={() => {}} />,
    );

    expect(
      result.component.container.querySelector("#rounded-arrow-left"),
    ).toBeInTheDocument();
  });
});
