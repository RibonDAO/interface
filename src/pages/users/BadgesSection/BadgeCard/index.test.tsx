import { renderComponent } from "config/testUtils/renders";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import { screen } from "@testing-library/react";
import BadgeCard from ".";

describe("BadgeCard", () => {
  const badge = {
    id: "1",
    name: "badge name",
    description: "badge description",
    image: "https://i.imgur.com/wv66Hlj.png",
  };
  beforeEach(() => {
    renderComponent(<BadgeCard badge={badge} />);
  });

  it("renders the badge image", () => {
    expectImageToBeInTheDocument("badge name");
  });

  it("renders the data after clicked", () => {
    const badgeImage = screen.getByAltText("badge name");
    clickOn(badgeImage);

    expectTextToBeInTheDocument("badge name");
    expectTextToBeInTheDocument("badge description");
  });
});
