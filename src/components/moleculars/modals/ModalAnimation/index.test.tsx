import { renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
import theme from "styles/theme";
import { screen } from "@testing-library/react";
import SupportersIcon from "assets/icons/supporters.svg";
import ModalAnimation from ".";

describe("ModalAnimation", () => {
  it("should render without error", () => {
    renderComponent(<ModalAnimation text="ModalAnimation" visible />);

    expectTextToBeInTheDocument("ModalAnimation");
  });

  describe("when the component is not visible and don't have text", () => {
    it("does not show", () => {
      renderComponent(<ModalAnimation />);
      expectTextNotToBeInTheDocument("ModalAnimation");
    });
  });

  describe("when has a icon origin or destiny", () => {
    beforeEach(() => {
      renderComponent(
        <ModalAnimation
          text="ModalAnimation"
          visible
          iconOrigin={SupportersIcon}
          textOrigin="textOrigin"
        />,
      );
    });

    it("renders icon", () => {
      expect(screen.getByAltText("iconOrigin")).toHaveStyle(
        `padding: 20%;
        width: 100%;`,
      );
    });
    it("renders icon description", () => {
      expect(screen.getByText("textOrigin")).toHaveStyle(
        `color: #82aabe;
        font-weight: ${theme.font.bold};
        padding-top: 4px;
        text-align: center;`,
      );
    });
  });
});
