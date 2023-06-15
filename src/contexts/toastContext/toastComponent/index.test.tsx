import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import Notification from "types/entities/Notification";
import { theme } from "@ribon.io/shared";
import userEvent from "@testing-library/user-event";
import Toast from ".";

describe("Toast component", () => {
  it("should render a notification with the correct message", () => {
    const notification = {
      message: "Test notification",
      type: "error",
      link: "https://example.com",
      linkMessage: "View more",
      closeButton: true,
      onClose: jest.fn(),
      navigate: "https://example.com",
    } as Notification;
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );
    expectTextToBeInTheDocument("Test notification");
    expectTextToBeInTheDocument("View more");
  });

  it("should navigate to another page when click", () => {
    const notification = {
      message: "Test notification",
      type: "error",
      link: "https://example.com",
      linkMessage: "View more",
      closeButton: true,
      onClose: jest.fn(),
    } as Notification;
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );
    expectTextToBeInTheDocument("Test notification");
    expectTextToBeInTheDocument("View more");

    userEvent.click(screen.getByText("Test notification"));
  });

  it("should render a error notification", () => {
    const notification = {
      message: "Test notification",
      type: "error",
      link: "https://example.com",
      linkMessage: "View more",
      closeButton: true,
      onClose: jest.fn(),
    } as Notification;
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );

    const errorIcon = screen.getByTestId("icon-report");
    expect(errorIcon).toBeInTheDocument();
    expect(errorIcon).toHaveStyle(`color: ${theme.colors.feedback.error[200]}`);
  });

  it("should render a success notification", () => {
    const notification = {
      message: "Test notification",
      type: "success",
      link: "https://example.com",
      linkMessage: "View more",
      closeButton: true,
      onClose: jest.fn(),
    } as Notification;
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );

    const successIcon = screen.getByTestId("icon-check_circle");
    expect(successIcon).toBeInTheDocument();
    expect(successIcon).toHaveStyle(
      `color: ${theme.colors.feedback.success[200]}`,
    );
  });

  it("should render a warning notification", () => {
    const notification = {
      message: "Test notification",
      type: "warning",
      link: "https://example.com",
      linkMessage: "View more",
      closeButton: true,
      onClose: jest.fn(),
    } as Notification;
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );

    const warningIcon = screen.getByTestId("icon-warning");
    expect(warningIcon).toBeInTheDocument();
    expect(warningIcon).toHaveStyle(
      `color: ${theme.colors.feedback.warning[600]}`,
    );
  });

  it("should render a info notification", () => {
    const notification = {
      message: "Test notification",
      type: "info",
      link: "https://example.com",
      linkMessage: "View more",
      closeButton: true,
      onClose: jest.fn(),
    } as Notification;
    renderComponent(
      <Toast />,

      { toastProviderValue: { notifications: [notification] } },
    );

    const infoIcon = screen.getByTestId("icon-info");
    expect(infoIcon).toBeInTheDocument();
    expect(infoIcon).toHaveStyle(
      `color: ${theme.colors.feedback.informational[300]}`,
    );
  });
});
