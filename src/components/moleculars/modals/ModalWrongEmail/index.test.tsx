import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ModalWrongEmail from ".";

describe("ModalWrongEmail", () => {
  it("should render without error", () => {
    renderComponent(<ModalWrongEmail visible setVisible={() => {}} />);

    expectTextToBeInTheDocument("Oops, incorrect e-mail");
    expectTextToBeInTheDocument("Try again");
    expectTextToBeInTheDocument("Contact support");

  });
});

