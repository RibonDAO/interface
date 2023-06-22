import { screen } from "@testing-library/react";
import { mockLogPageViewFunction, mockNewLogEventFunction } from "setupTests";
import { renderComponent, waitForPromises } from "./config/testUtils";
import App from "./App";

jest.mock("lib/events", () => ({
  __esModule: true,
  logPageView: mockLogPageViewFunction,
  newLogEvent: mockNewLogEventFunction,
}));

describe("App", () => {
  it("renders without errors", async () => {
    renderComponent(<App />);
    await waitForPromises();

    expect(screen.queryAllByText("spinner.svg").length).toBeGreaterThan(0);
  });
});
