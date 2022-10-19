import { renderComponent } from "config/testUtils";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import storyFactory from "config/testUtils/factories/storyFactory";
import StoriesPage from ".";

describe("StoriesPage", () => {
  it("render without errors", () => {
    renderComponent(<StoriesPage />, {
      locationState: {
        nonProfit: nonProfitFactory({
          impactByTicket: 2,
          impactDescription: "days of impact",
        }),
        stories: [
          storyFactory({
            title: "Sobre",
          }),
        ],
      },
    });

    expectTextToBeInTheDocument("Sobre");
  });
});
