import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  ToastContext,
} from "contexts/toastContext";
import { useContext } from "react";

import Notification from "types/entities/Notification";

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
    timeout = 5000,
    linkMessage,
    backgroundColor,
    borderColor,
    textColor,
    position,
    icon,
    iconColor,
    navigate,
    closeButton = true,
  }: Notification) {
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
        iconColor,
        onClose: () => handleClose(id),
        closeButton,
        navigate,
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
