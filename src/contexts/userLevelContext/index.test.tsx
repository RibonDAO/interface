import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useUserLevel } from ".";

function UserLevelTestPage(){
  useUserLevel();
  return <div>UserLevel</div>
}

describe("useUserLevel", () => {
  it("renders without error", () => {
    renderComponent(<UserLevelTestPage />);
    expectTextToBeInTheDocument("UserLevel");
  });
});
