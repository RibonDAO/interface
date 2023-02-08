import { renderHook } from "@testing-library/react-hooks";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ModalProvider from "contexts/modalContext";
import { act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { useModal } from ".";

describe("useModal", () => {
  let current: ReturnType<typeof useModal>;
  const wrapper = ({ children }: any) => (
    <ThemeProvider theme={theme}>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  );

  describe("when the screen is on mobile size", () => {
    beforeEach(() => {
      const { result } = renderHook(
        () =>
          useModal({
            type: MODAL_TYPES.MODAL_BLANK,
            props: {
              children: <div>test</div>,
            },
          }),
        { wrapper },
      );
      current = result.current;
    });

    it("renders the modal when show is called", () => {
      act(() => {
        current.show();
      });

      expectTextToBeInTheDocument("test");
    });

    it("renders the modal when show is called with props", () => {
      act(() => {
        current.show({
          type: MODAL_TYPES.MODAL_BLANK,
          props: {
            children: <div>new test</div>,
          },
        });
      });

      expectTextToBeInTheDocument("new test");
    });

    it("hides the modal when hide is called", () => {
      act(() => {
        current.hide();
      });
      expectTextNotToBeInTheDocument("test");
    });
  });
});
