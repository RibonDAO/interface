import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { setLocalStorageItem } from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";
import React from "react";
import { mockRequest } from "config/testUtils/test-helper";
import LayoutHeader from ".";

describe("LayoutHeader", () => {
  mockRequest("/api/v1/users/can_donate", {
    payload: { canDonate: true },
    method: "POST",
  });

  it("should render without errors", () => {
    renderComponent(<LayoutHeader />);
  });

  it("should donation ticket modal when click in ticket button", () => {
    setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "123");
    renderComponent(<LayoutHeader />);

    clickOn("1");
    expectTextToBeInTheDocument("Great! You got 1 ticket to donate");
    expectTextToBeInTheDocument("You can assign the ticket to any project");
  });
});
