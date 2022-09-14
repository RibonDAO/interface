import { screen } from "@testing-library/react";
import { renderComponent, waitForPromises } from "./config/testUtils";

import App from "./App";

describe("App", () => {
  it("renders without errors", async () => {
    renderComponent(<App />);
    await waitForPromises();

    expect(screen.queryAllByText("Causes").length).toBeGreaterThan(0);
  });
});
