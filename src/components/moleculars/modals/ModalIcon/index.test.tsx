import React from "react";
import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ribonIcon from "assets/icons/ribon.svg";
import ModalIcon from ".";

describe("ModalIcon", () => {
  it("should render without error", () => {
    renderComponent(<ModalIcon title="ModalIcon" visible />);

    expectTextToBeInTheDocument("ModalIcon");
  });

  describe("when the icon is a biggerIcon", () => {
    beforeEach(() => {
      renderComponent(
        <ModalIcon title="ModalIcon" visible icon={ribonIcon} biggerIcon />,
      );
    });

    it("shows the bigger icon on screen", () => {
      expectImageToBeInTheDocument("modal-bigger-icon");
    });
  });
});
