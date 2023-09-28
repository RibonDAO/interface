import { renderComponent } from "config/testUtils/renders";
import ExperimentRouteComponent from "services/growthbook/ExperimentRouteComponent/index";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import * as Growthbook from "@growthbook/growthbook-react";
import { screen } from "@testing-library/react";

describe("ExperimentRouteComponent", () => {
  describe("when feature is on", () => {
    beforeEach(() => {
      jest.spyOn(Growthbook, "useFeatureIsOn").mockReturnValue(true);
    });

    it("should render alternative page", () => {
      renderComponent(
        <ExperimentRouteComponent
          featureFlagId="feature-flag-id"
          source="source"
        >
          <div>children</div>
        </ExperimentRouteComponent>,
      );

      expect(screen.getByTestId("alternative-page")).toBeInTheDocument();
    });
  });

  describe("when feature is off", () => {
    beforeEach(() => {
      jest.spyOn(Growthbook, "useFeatureIsOn").mockReturnValue(false);
    });

    it("should render children", () => {
      renderComponent(
        <ExperimentRouteComponent
          featureFlagId="feature-flag-id"
          source="source"
        >
          <div>children</div>
        </ExperimentRouteComponent>,
      );

      expectTextToBeInTheDocument("children");
    });
  });
});
