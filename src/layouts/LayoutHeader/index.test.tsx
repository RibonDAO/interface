import { clickOn, renderComponent } from "config/testUtils";
import { expectPageToNavigateTo } from "config/testUtils/expects";
import { setLocalStorageItem } from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";
import React from "react";
import { mockRequest } from "config/testUtils/test-helper";
import { screen } from "@testing-library/react";
import LayoutHeader from ".";

const mockIntegration = {
  id: "1",
  name: "Test Integration",
  logo: "logo",
  integrationTask: {
    linkAddress: "https://www.test.com",
  },
};
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useIntegration: () => ({
    integration: mockIntegration,
    refetch: jest.fn(),
  }),
}));
jest.mock("hooks/useIntegrationId", () => ({
  __esModule: true,
  ...jest.requireActual("hooks/useIntegrationId"),
  useIntegrationId: () => "9",
}));

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
    expectPageToNavigateTo("/tickets");
  });

  describe("when side logo is clicked", () => {
    describe("when user can donate", () => {
      beforeEach(() => {
        renderComponent(<LayoutHeader />);

        const sideLogo = screen.getByAltText("side-logo");
        clickOn(sideLogo);
      });

      it("goes to the return to integration page", () => {
        expectPageToNavigateTo("return-to-integration");
      });
    });
  });
});
