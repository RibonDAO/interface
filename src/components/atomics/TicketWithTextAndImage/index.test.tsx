import { clickOn, renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import logo from "assets/icons/logo.svg";
import { mockNewLogEventFunction } from "setupTests";
import TicketWithTextAndImage from ".";

describe("TicketWithTextAndImage", () => {
  it("renders with link", () => {
    renderComponent(
      <TicketWithTextAndImage
        title="title"
        subtitle="subtitle"
        link="link"
        image={logo}
      />,
    );

    expectTextToBeInTheDocument("title");
    expectTextToBeInTheDocument("subtitle");
    expectImageToBeInTheDocument("logo");
  });

  it("renders without link", () => {
    renderComponent(
      <TicketWithTextAndImage title="title" subtitle="subtitle" image={logo} />,
    );

    expectTextToBeInTheDocument("title");
    expectTextToBeInTheDocument("subtitle");
    expectImageToBeInTheDocument("logo");
  });

  it("renders with link and event", () => {
    renderComponent(
      <TicketWithTextAndImage
        title="title"
        subtitle="subtitle"
        link="https://example.com"
        image={logo}
        eventName="eventName"
        eventParams={{ eventParams: "eventParams" }}
      />,
    );
    window.open = jest.fn();

    clickOn("subtitle");
    expect(mockNewLogEventFunction).toHaveBeenCalledWith("click", "eventName", {
      eventParams: "eventParams",
    });
    expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");
  });
});
