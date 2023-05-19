import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockNewLogEventFunction } from "setupTests";
import ModalDialog from ".";

describe("ModalDialog", () => {
  it("should render without error", () => {
    renderComponent(<ModalDialog visible description="modal" />);

    expectTextToBeInTheDocument("modal");
  });
});

describe("when the modal is visible and has an eventName", () => {
  const eventName = "test";
  const eventParams = { test: "test" };
  const action = "view";
  it("logs an event", () => {
    renderComponent(
      <ModalDialog visible eventName={eventName} eventParams={eventParams} />,
    );
    expect(mockNewLogEventFunction).toHaveBeenCalledWith(
      action,
      eventName,
      eventParams,
    );
  });
});
