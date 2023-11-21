import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import LoadingPage from ".";

describe("LoadingPage", () => {
  it("should render without error", () => {
    renderComponent(<LoadingPage />);

    expect(screen.queryAllByTestId("spinner")).toHaveLength(1);
  });
});
