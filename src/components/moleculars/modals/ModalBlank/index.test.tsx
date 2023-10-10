import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockLogEventFunction } from "setupTests";
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
  it("logs an event", () => {
    renderComponent(
      <ModalBlank visible eventName={eventName} eventParams={eventParams} />,
    );
    expect(mockLogEventFunction).toHaveBeenCalledWith(eventName, eventParams);
  });
});
