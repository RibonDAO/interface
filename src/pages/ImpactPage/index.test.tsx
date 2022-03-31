import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import Impact from ".";

describe("Impact", () => {
  describe("when there are no tickets used", () => {
    it("should render title", () => {
      renderComponent(<Impact />);

      expectTextToBeInTheDocument("IMPACT");
    });

    it("should render cardEmptySection", () => {
      renderComponent(<Impact />);

      expectTextToBeInTheDocument("Donate now");
      expectTextToBeInTheDocument(
        "Your donation impact summary will be shown here",
      );
    });
  });
});
