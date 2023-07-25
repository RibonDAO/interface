import { renderComponent } from "config/testUtils/renders";
import { expectPageToNavigateTo } from "config/testUtils/expects";
import * as growthbookReact from "@growthbook/growthbook-react";
import SupportCauseFlowControlPage from ".";

const defaultValues = {
  variationId: 0,
  key: "",
  inExperiment: false,
  hashAttribute: "",
  hashValue: "",
  featureId: null,
};
describe("SupportCauseFlowControlPage", () => {
  const mockFn = jest.fn();

  it("registers a navigate_to_contribution_page action", () => {
    renderComponent(<SupportCauseFlowControlPage />, {
      tasksProviderValue: {
        registerAction: mockFn,
      },
    });

    expect(mockFn).toHaveBeenCalledWith("navigate_to_contribution_page");
  });

  describe("when variation is control", () => {
    beforeEach(() => {
      jest.spyOn(growthbookReact, "useExperiment").mockReturnValue({
        ...defaultValues,
        value: "Control",
      });
    });

    it("navigates to support cause", () => {
      renderComponent(<SupportCauseFlowControlPage />);

      expectPageToNavigateTo("/promoters/support-cause");
    });
  });

  describe("when variation is SupportCause", () => {
    beforeEach(() => {
      window.location.replace = jest.fn();
      jest.spyOn(growthbookReact, "useExperiment").mockReturnValue({
        ...defaultValues,
        value: "SupportCause",
      });
    });

    it("navigates to cause landing page", () => {
      renderComponent(<SupportCauseFlowControlPage />);

      expect(window.location.replace).toHaveBeenCalledWith(
        "https://projetos.ribon.io/promotor-causa",
      );
    });
  });

  describe("when variation is SupportDash", () => {
    beforeEach(() => {
      window.location.replace = jest.fn();
      jest.spyOn(growthbookReact, "useExperiment").mockReturnValue({
        ...defaultValues,
        value: "SupportDash",
      });
    });

    it("navigates to dash landing page", () => {
      renderComponent(<SupportCauseFlowControlPage />);

      expect(window.location.replace).toHaveBeenCalledWith(
        "https://projetos.ribon.io/promotor-dash",
      );
    });
  });
});
