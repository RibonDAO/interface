import { useModalContext } from "contexts/modalContext";
import { ShowModalProps } from "contexts/modalContext/helpers";
import { useEffect } from "react";

export function useModal(
  showModalProps: ShowModalProps,
  initialVisibilityState = false,
) {
  const { showModal, hideModal } = useModalContext();

  useEffect(() => {
    if (initialVisibilityState) showModal(showModalProps);
  }, []);

  const show = (props?: ShowModalProps) => {
    if (props) showModal(props);
    else showModal(showModalProps);
  };

  const hide = () => {
    hideModal();
  };

  return { show, hide };
}
