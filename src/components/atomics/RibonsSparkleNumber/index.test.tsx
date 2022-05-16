import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import RibonsSparkleNumber from ".";

describe("RibonsSparkleNumber", () => {
  it("should render without error", () => {
    renderComponent(<RibonsSparkleNumber ribons={100} />);

    expectTextToBeInTheDocument("100");
  });
});
