import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Notification from "types/entities/Notification";
import Toast from ".";

describe("Toast component", () => {
  const notification = {
    message: "Test notification",
    type: "error",
  } as Notification;
  it("should render a notification with the correct message", () => {
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );
    expectTextToBeInTheDocument("Test notification");
  });
});
