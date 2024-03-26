import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CustomLinkCreatedPage from ".";

describe("CustomLinkCreatedPage", () => {
  it("renders without error", () => {
    renderComponent(<CustomLinkCreatedPage />);

    expectTextToBeInTheDocument("Awesome! Your link was created successfully.");
  });
});
