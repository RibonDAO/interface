import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import UserProgress from ".";

describe("UserProgress", () => {
  beforeEach(() => {
    renderComponent(
      <UserProgress
        nextLevel={10}
        totalExperienceToNextLevel={80}
        currentExperience={60}
        percentageCompleted={20}
      />,
    );
  });

  it("renders the experience indicator", () => {
    expectTextToBeInTheDocument("60 / 80");
  });

  it("renders the amount needed for next level", () => {
    expectTextToBeInTheDocument("+20 lives for level 10");
  });
});
