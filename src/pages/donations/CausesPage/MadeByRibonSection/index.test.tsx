import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import MadeByRibonSection from ".";

describe("MadeByRibonPill", () => {
  beforeEach(async () => {
    await renderComponent(<MadeByRibonSection />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("Made by");
  });

  describe("on click", () => {
    beforeEach(async () => {
      clickOn("Made by");
    });
    it("should log the event", () => {
      expectLogEventToHaveBeenCalledWith("madebyribon_click");
    });
  });
});
