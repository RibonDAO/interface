import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useNonProfits } from ".";

function NonProfitsTestPage() {
  useNonProfits();
  return <div>NonProfits</div>;
}

describe("useNonProfits", () => {
  it("renders without error", () => {
    renderComponent(<NonProfitsTestPage />);
    expectTextToBeInTheDocument("NonProfits");
  });
});
