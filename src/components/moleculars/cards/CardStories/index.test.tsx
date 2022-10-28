import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import storyFactory from "config/testUtils/factories/storyFactory";
import CardStories from ".";

describe("CardStories", () => {
  it("should render CardStories", () => {
    const stories = [storyFactory()];

    const profileData = {
      name: "Dara",
      logo: "https://picsum.photos/200/300",
      subtitle: "Saúde",
    };

    renderComponent(
      <CardStories
        stories={stories}
        profileData={profileData}
        onAllStoriesEnd={() => {}}
        onCloseButtonClick={() => {}}
      />,
    );
    expect(screen.getByText("Dara")).toBeInTheDocument();
  });
});
