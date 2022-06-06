import React from "react";
import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CardCircleImage from ".";

describe("CardCircleImage", () => {
  it("should render without error", () => {
    renderComponent(<CardCircleImage image="" />);

    expectImageToBeInTheDocument("circle-img");
  });

  it("should show title and subtitle", () => {
    renderComponent(
      <CardCircleImage
        image=""
        title="card-cicle-image-title"
        subtitle="card-cicle-image-subtitle"
      />,
    );

    expectImageToBeInTheDocument("circle-img");
    expectTextToBeInTheDocument("card-cicle-image-title");
    expectTextToBeInTheDocument("card-cicle-image-subtitle");
  });
});
