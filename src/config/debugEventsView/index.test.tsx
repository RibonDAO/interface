import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { logEvent } from "lib/events";
import DebugEventsView from ".";

describe("debugEventsView", () => {
  beforeEach(() => {
    renderComponent(<DebugEventsView />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("Debug View");
  });
});
