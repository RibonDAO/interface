import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import UserAvatar from ".";

describe("UserAvatar", () => {
  it("renders without error", () => {
    renderComponent(<UserAvatar isMember />);

    expectTextToBeInTheDocument("Ribon Club");
  });
});
