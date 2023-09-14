import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import UserProgress from ".";

describe("UserProgress", () => {
  beforeEach(() => {
    renderComponent(
      <UserProgress
        nextLevel={10}
        totalExperienceToNextLevel={80}
        currentLevelExperience={60}
        currentExperience={60}
        percentageCompleted={75}
      />,
    );
  });

  it("renders the experience indicator", () => {
    expectTextToBeInTheDocument("0 / 20");
  });

  it("renders the amount needed for next level", () => {
    expectTextToBeInTheDocument("+20 people for level 10");
  });
});
