import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

import TagsSelectSection from ".";

jest.mock("lib/onboardingFirstAccess", () => ({
  isFirstAccess: jest.fn(() => false),
}));

describe("TagsSelectSection", () => {
  const mockTag = {
    id: 1,
    name: "Tag 1",
    status: "active",
    nonProfits: [],
  };

  renderComponent(<TagsSelectSection />, {
    currentUserProviderValue: {
      signedIn: true,
    },
    tagsProviderValue: {
      tags: [mockTag],
    },
  });

  it("renders all the select options", () => {
    expectTextToBeInTheDocument("All");
    expectTextToBeInTheDocument("Tag 1");
  });
});
