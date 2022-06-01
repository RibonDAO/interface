import { screen } from "@testing-library/react";
import { renderComponent } from "./config/testUtils";

import App from "./App";

describe("App", () => {
  it("renders without errors", () => {
    renderComponent(<App />);

    expect(screen.queryAllByText("Causes")).toHaveLength(2);
  });
});
