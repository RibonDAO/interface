import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import storyFactory from "config/testUtils/factories/storyFactory";
import StoriesWithDescription from ".";

describe("StoriesWithDescription", () => {
  it("should render StoriesWithDescription", () => {
    const story = storyFactory({
      title: "Sobre",
    });

    renderComponent(
      <StoriesWithDescription story={story} hasProfileData={false} />,
    );
    expect(screen.getByText("Sobre")).toBeInTheDocument();
  });
});
