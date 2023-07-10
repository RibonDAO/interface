import { renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
import theme from "styles/theme";
import { screen } from "@testing-library/react";
import SupportersIcon from "assets/icons/supporters.svg";
import { mockNewLogEventFunction } from "setupTests";
import TransferAnimation from ".";

describe("TransferAnimation", () => {
  it("should render without error", () => {
    renderComponent(<TransferAnimation text="TransferAnimation" />);

    expectTextToBeInTheDocument("TransferAnimation");
  });

  describe("when the component is not visible and don't have text", () => {
    it("does not show", () => {
      renderComponent(<TransferAnimation />);
      expectTextNotToBeInTheDocument("TransferAnimation");
    });
  });

  describe("when has a icon origin or destiny", () => {
    beforeEach(() => {
      renderComponent(
        <TransferAnimation
          text="TransferAnimation"
          iconOrigin={SupportersIcon}
          textOrigin="textOrigin"
        />,
      );
    });

    it("renders icon", () => {
      expect(screen.getAllByAltText("icon")[0]).toHaveStyle(
        `padding: 20%;
        width: 100%;`,
      );
    });
    it("renders icon description", () => {
      expect(screen.getByText("textOrigin")).toHaveStyle(
        `color: #82aabe;
        font-weight: ${theme.font.medium};
        padding-top: 8px;
        text-align: center;`,
      );
    });
  });

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    const action = "view";
    it("logs an event", () => {
      renderComponent(
        <TransferAnimation eventName={eventName} eventParams={eventParams} />,
      );
      expect(mockNewLogEventFunction).toHaveBeenCalledWith(
        action,
        eventName,
        eventParams,
      );
    });
  });
});
