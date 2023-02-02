import React from "react";
import { renderComponent } from "config/testUtils";
import storyFactory from "config/testUtils/factories/storyFactory";
import { screen } from "@testing-library/react";
import StoriesWithDescription from ".";

describe("StoriesWithDescription", () => {
  it("should render without error", () => {
    const story = storyFactory({
      title: "Sobre",
    });

    renderComponent(
      <StoriesWithDescription story={story} hasProfileData={false} />,
    );

    expect(screen.queryAllByTestId("spinner")).toHaveLength(1);
  });
});
