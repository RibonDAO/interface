import { createContext, useContext, useMemo, useState } from "react";
import { MODAL_COMPONENTS, ShowModalProps } from "./helpers";

export interface IModalContext {
  showModal: (showModalProps: ShowModalProps) => void;
  hideModal: () => void;
  visible: boolean;
  store: any;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const ModalContext = createContext<IModalContext>({} as IModalContext);

function ModalProvider({ children }: Props) {
  const [store, setStore] = useState({ modalType: "", modalProps: {} });
  const [visible, setVisible] = useState(false);
  const { modalType, modalProps } = store || {};

  const showModal = ({ type, props }: ShowModalProps) => {
    setVisible(true);
    setStore({
      ...store,
      modalType: type,
      modalProps: props,
    });
  };

  const hideModal = () => {
    setVisible(false);
    setStore({
      ...store,
      modalType: "",
      modalProps: {},
    });
  };

  const renderComponent = () => {
    if (!modalType) return null;

    const ModalComponent = MODAL_COMPONENTS[modalType];

    return (
      <ModalComponent
        id="global-modal"
        visible={visible}
        onClose={hideModal}
        {...modalProps}
      />
    );
  };

  const modalObject: IModalContext = useMemo(
    () => ({
      showModal,
      hideModal,
      visible,
      store,
    }),
    [visible],
  );

  return (
    <ModalContext.Provider value={modalObject}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return context;
};
