import { renderComponent } from "config/testUtils/renders";
import { expectImageToBeInTheDocument } from "config/testUtils/expects";
import BadgesSection from ".";

jest.mock("hooks/useUserBadges", () => () => ({
  badges: [
    {
      id: "1",
      name: "badge name",
      description: "badge description",
      image: "https://i.imgur.com/wv66Hlj.png",
      category: "level",
      achieved: true,
    },
  ],
}));

describe("BadgesSection", () => {
  beforeEach(() => {
    renderComponent(<BadgesSection />);
  });

  it("renders the badge image", () => {
    expectImageToBeInTheDocument("badge name");
  });
});
