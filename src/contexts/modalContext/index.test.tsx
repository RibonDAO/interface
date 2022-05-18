import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { useModalContext } from ".";
import { MODAL_TYPES, ShowModalProps } from "./helpers";

type Props = {
  showModalProps: ShowModalProps;
};
function ModalTestPage({ showModalProps }: Props) {
  const { showModal, hideModal } = useModalContext();

  return (
    <div>
      Modal
      <button type="button" onClick={() => showModal(showModalProps)}>
        Show Modal
      </button>
      <button type="button" onClick={() => hideModal()}>
        Hide Modal
      </button>
    </div>
  );
}

describe("useModalContext", () => {
  describe("when show modal is clicked", () => {
    it("shows the modal", () => {
      renderComponent(
        <ModalTestPage
          showModalProps={{
            type: MODAL_TYPES.MODAL_ICON,
            props: {
              icon: "icon",
              title: "title",
              body: "body",
            },
          }}
        />,
      );
      clickOn("Show Modal");

      expectTextToBeInTheDocument("title");
      expectTextToBeInTheDocument("body");
    });
  });

  describe("when hide modal is clicked", () => {
    it("hides the modal", () => {
      renderComponent(
        <ModalTestPage
          showModalProps={{
            type: MODAL_TYPES.MODAL_ICON,
            props: {
              icon: "icon",
              title: "title",
              body: "body",
            },
          }}
        />,
      );
      clickOn("Show Modal");
      expectTextToBeInTheDocument("title");
      expectTextToBeInTheDocument("body");
      clickOn("Hide Modal");

      expectTextNotToBeInTheDocument("title");
      expectTextNotToBeInTheDocument("body");
    });
  });
});
