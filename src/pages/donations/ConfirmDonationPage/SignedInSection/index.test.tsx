import { nonProfitFactory, userFactory } from "@ribon.io/shared/config";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import SignedInSection from ".";

describe("SignedInSection", () => {
  const nonProfit = nonProfitFactory();
  const onContinue = jest.fn();
  const user = userFactory();

  beforeEach(() => {
    renderComponent(
      <SignedInSection nonProfit={nonProfit} onContinue={onContinue} />,
      {
        currentUserProviderValue: {
          currentUser: user,
        },
      },
    );
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Your donation");
  });

  it("calls the on continue function when continue button is pressed", () => {
    clickOn("Confirm donation");

    expect(onContinue).toHaveBeenCalledWith(user.email);
  });
});
