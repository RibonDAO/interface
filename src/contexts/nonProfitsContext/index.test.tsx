import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useNonProfitsContext } from ".";

function NonProfitsTestPage() {
  useNonProfitsContext();
  return <div>NonProfits</div>;
}

describe("useNonProfits", () => {
  it("renders without error", () => {
    renderComponent(<NonProfitsTestPage />);
    expectTextToBeInTheDocument("NonProfits");
  });
});
