import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockNewLogEventFunction } from "setupTests";
import ModalBlank from ".";

describe("ModalBlank", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalBlank visible>
        <div>blank</div>
      </ModalBlank>,
    );

    expectTextToBeInTheDocument("blank");
  });
});

describe("when the modal is visible and has an eventName", () => {
  const eventName = "test";
  const eventParams = { test: "test" };
  const action = "view";
  it("logs an event", () => {
    renderComponent(
      <ModalBlank visible eventName={eventName} eventParams={eventParams} />,
    );
    expect(mockNewLogEventFunction).toHaveBeenCalledWith(
      action,
      eventName,
      eventParams,
    );
  });
});
