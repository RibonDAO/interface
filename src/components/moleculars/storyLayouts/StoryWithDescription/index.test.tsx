import React from "react";
import { renderComponent } from "config/testUtils";
import storyFactory from "config/testUtils/factories/storyFactory";
import StoriesWithDescription from ".";

describe("StoriesWithDescription", () => {
  it("should render without error", () => {
    const story = storyFactory({
      title: "Sobre",
    });

    renderComponent(
      <StoriesWithDescription story={story} hasProfileData={false} />,
    );
  });
});
