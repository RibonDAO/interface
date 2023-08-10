import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { screen } from "@testing-library/react";
import { mockNewLogEventFunction } from "setupTests";
import { clickOn } from "config/testUtils";
import CauseImage from ".";

jest.mock("lib/events");

describe("CauseImage", () => {
  describe("default props", () => {
    beforeEach(() => {
      renderComponent(<CauseImage id={1} name="Test Cause" index={0} />, {
        causesProviderValue: {
          causes: [],
        },
      });
    });
    it("renders component with default props", () => {
      expectTextToBeInTheDocument("Test Cause");
      expect(screen.getByAltText("Test Cause")).toBeInTheDocument();
    });
  });

  describe("custom props", () => {
    beforeEach(() => {
      renderComponent(
        <CauseImage
          id={1}
          name="Test Cause with image"
          coverImage="https://example.com/cover.jpg"
          index={0}
        />,
        {
          causesProviderValue: {
            causes: [],
          },
        },
      );
    });

    it("renders component with custom props", () => {
      expectTextToBeInTheDocument("Test Cause with image");
      expect(screen.getByAltText("Test Cause with image")).toBeInTheDocument();
    });
  });

  describe("when clicks", () => {
    beforeEach(() => {
      const setChosenCauseId = jest.fn();
      const setChooseCauseModalVisible = jest.fn();

      renderComponent(<CauseImage id={1} name="Test Cause" index={0} />, {
        causesProviderValue: {
          causes: [],
        },
        causeDonationProviderValue: {
          setChosenCauseId,
          setChooseCauseModalVisible,
        },
      });
    });

    it("log event", () => {
      clickOn("Test Cause");

      expect(mockNewLogEventFunction).toHaveBeenCalledWith(
        "click",
        "P1_causeCard",
        {
          causeId: 1,
        },
      );
    });
  });
});
