import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockLogEventFunction } from "setupTests";
import ModalWrongEmail from ".";

describe("ModalWrongEmail", () => {
  it("should render without error", () => {
    renderComponent(<ModalWrongEmail visible setVisible={() => {}} />);

    expectTextToBeInTheDocument("Oops, incorrect e-mail");
    expectTextToBeInTheDocument("Try again");
    expectTextToBeInTheDocument("Contact support");
  });

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    it("logs an event", () => {
      renderComponent(
        <ModalWrongEmail
          visible
          setVisible={() => {}}
          eventName={eventName}
          eventParams={eventParams}
        />,
      );
      expect(mockLogEventFunction).toHaveBeenCalledWith(eventName, eventParams);
    });
  });
});
