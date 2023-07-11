import { renderComponent } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import {act} from "@testing-library/react";
import DebugEventsView, { logDebugEvent } from ".";

describe("debugEventsView", () => {
  beforeEach(() => {
    renderComponent(<DebugEventsView />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("Debug View");
  });

  describe("when an event is logged", () => {
    it("renders the event", () => {
      act(() => {
        logDebugEvent("testEvent", { testParam: "testValue" });
      })

      expectTextToBeInTheDocument("testEvent");
      expectTextToBeInTheDocument("{\"testParam\":\"testValue\"}");
    });
  });

  describe("when reset button is clicked", () => {
    it("clear all event logs", () => {
      act(() => {
        logDebugEvent("testEvent", { testParam: "testValue" });
      })

      expectTextToBeInTheDocument("testEvent");
      expectTextToBeInTheDocument("{\"testParam\":\"testValue\"}");

      clickOn("reset");
      expectTextNotToBeInTheDocument("testEvent");
      expectTextNotToBeInTheDocument("{\"testParam\":\"testValue\"}");
    });
  });
});
