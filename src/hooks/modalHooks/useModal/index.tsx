import { useModalContext } from "contexts/modalContext";
import { ShowModalProps } from "contexts/modalContext/helpers";

export function useModal(showModalProps: ShowModalProps) {
  const { showModal, hideModal } = useModalContext();

  const show = (props?: ShowModalProps) => {
    if (props) showModal(props);
    else showModal(showModalProps);
  };

  const hide = () => {
    hideModal();
  };

  return { show, hide };
}
