import { screen } from "@testing-library/react";
import { mockLogPageViewFunction } from "setupTests";
import { renderComponent, waitForPromises } from "./config/testUtils";
import App from "./App";

jest.mock("lib/events", () => ({
  __esModule: true,
  logPageView: mockLogPageViewFunction,
}));

describe("App", () => {
  it("renders without errors", async () => {
    renderComponent(<App />);
    await waitForPromises();

    expect(screen.queryAllByText("Donate to a project").length).toBeGreaterThan(
      0,
    );
  });
});
