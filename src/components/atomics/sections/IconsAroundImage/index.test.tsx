import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import VolunteerActivismPink from "assets/icons/volunteer-activism-pink.svg";
import VolunteerActivismYellow from "assets/icons/volunteer-activism-yellow.svg";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import IconsAroundImage from ".";

describe("IconsAroundImage", () => {
  it("should render without error", () => {
    renderComponent(
      <IconsAroundImage
        imageSrc="https://picsum.photos/200"
        iconAnimationGreen={VolunteerActivismGreen}
        iconAnimationPink={VolunteerActivismPink}
        iconAnimationYellow={VolunteerActivismYellow}
      />,
    );

    expect(screen.queryAllByTestId("animations-container")).toHaveLength(1);
  });
});
