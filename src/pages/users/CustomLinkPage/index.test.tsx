import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CustomLinkPage from ".";

describe("CustomLinkPage", () => {
  it("renders without error", () => {
    renderComponent(<CustomLinkPage />);

    expectTextToBeInTheDocument("Create your donation link");
  });
});
