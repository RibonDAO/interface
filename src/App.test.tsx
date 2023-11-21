import { screen } from "@testing-library/react";
import { mockLogPageViewFunction } from "setupTests";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import * as DebugEventsHelpers from "config/debugEventsView/helpers";
import { renderComponent, waitForPromises } from "./config/testUtils";
import App from "./App";

const mockDebugEventsHelpers = DebugEventsHelpers as {
  debugEnabled: () => boolean;
};
jest.mock("lib/events", () => ({
  __esModule: true,
  logPageView: mockLogPageViewFunction,
}));

describe("App", () => {
  it("renders without errors", async () => {
    renderComponent(<App />);
    await waitForPromises();

    expect(screen.queryAllByTestId("spinner")).toHaveLength(1);
  });

  describe("when the debug events is enabled", () => {
    it("renders the debug events view", async () => {
      mockDebugEventsHelpers.debugEnabled = jest.fn().mockReturnValue(true);
      renderComponent(<App />);
      await waitForPromises();

      expectTextToBeInTheDocument("Debug View");
    });
  });

  describe("when the debug events is disabled", () => {
    it("does not render debug events view", async () => {
      mockDebugEventsHelpers.debugEnabled = jest.fn().mockReturnValue(false);
      renderComponent(<App />);
      await waitForPromises();

      expectTextNotToBeInTheDocument("Debug View");
    });
  });
});
