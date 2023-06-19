import { clickOn, renderComponent } from "config/testUtils";
import { expectPageToNavigateTo } from "config/testUtils/expects";
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

  it("should navigate to give ticket page when click in ticket button", () => {
    setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "123");
    renderComponent(<LayoutHeader />);

    clickOn("1");
    expectPageToNavigateTo("/give-ticket");
  });
});
