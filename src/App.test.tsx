import { screen } from "@testing-library/react";
import { renderComponent, waitForPromises } from "./config/testUtils";

import App from "./App";

describe("App", () => {
  it("renders without errors", async () => {
    renderComponent(<App />);
    await waitForPromises();

    expect(screen.queryAllByText("Donate to a project").length).toBeGreaterThan(
      0,
    );
  });
});
