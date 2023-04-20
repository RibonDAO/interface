import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  ToastContext,
} from "contexts/toastContext";
import { useContext } from "react";

type Props = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  link?: string;
  timeout?: number;
  linkMessage?: string;
  icon?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  onClose?: () => void;
};

const useToast = () => {
  const { dispatch } = useContext(ToastContext);

  const handleClose = (id: number) => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: id,
    });
  };
  function toast({
    type = "success",
    message,
    link,
    timeout = 1000000,
    linkMessage,
    backgroundColor,
    borderColor,
    textColor,
    position,
    icon,
  }: Props) {
    const id = Math.random();
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        id,
        type,
        message,
        link,
        linkMessage,
        backgroundColor,
        borderColor,
        textColor,
        position,
        icon,
        onClose: () => handleClose(id),
      },
    });
    setTimeout(() => {
      dispatch({
        type: DELETE_NOTIFICATION,
        payload: id,
      });
    }, timeout);
  }

  return toast;
};

export default useToast;
