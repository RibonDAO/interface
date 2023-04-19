import React from "react";
import { renderComponent } from "config/testUtils";
import Toast from ".";

const mockContext = {
  notifications: [
    {
      type: "success",
      message: "This is a success message",
    },
    {
      type: "warning",
      message: "This is a warning message",
    },
  ],
};

test("renders the Toast component without any errors", () => {
  renderComponent(
    <Toast />,

    { toastProviderValue: { notifications: mockContext } },
  );
});
