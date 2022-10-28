import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import logo from "assets/icons/logo.svg";
import TicketWithTextAndImage from ".";

describe("TicketWithTextAndImage", () => {
  it("should render without error", () => {
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
});
