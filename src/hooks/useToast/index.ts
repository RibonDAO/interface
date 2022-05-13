import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  ToastContext,
} from "contexts/toastContext";
import { useContext } from "react";
import theme from "styles/theme";

type Props = {
  message: string;
  type?: "success" | "error";
  link?: string;
  timeout?: number;
};

const useToast = () => {
  const { dispatch } = useContext(ToastContext);
  function toast({ type = "success", message, link, timeout = 10000 }: Props) {
    const id = Math.random();
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        id,
        type,
        message,
        link,
        linkMessage: "Learn more",
        color:
          type === "success" ? theme.colors.ribonBlack : theme.colors.lgRed,
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
