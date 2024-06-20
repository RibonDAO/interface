import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import { clickOn } from "config/testUtils";
import SettingsMenu from ".";

describe("SettingsMenu", () => {
  describe("when cog icon is clicked", () => {
    it("renders the menu options", () => {
      renderComponent(<SettingsMenu />);
      const cogIcon = screen.getByTestId("icon-settings");
      clickOn(cogIcon);

      expectTextToBeInTheDocument("Change language");
      expectTextToBeInTheDocument("User support");
    });
  });
});
