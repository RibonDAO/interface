import React from "react";
import { renderComponent } from "config/testUtils";
import icon from "assets/icons/ribon.svg";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ModalRows from ".";

describe("ModalRows", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalRows
        rowsContent={[
          {
            id: 1,
            icon,
            text: "rows",
          },
        ]}
        visible
      />,
    );

    expectTextToBeInTheDocument("rows");
  });
});
