import { createContext, useMemo, useReducer } from "react";
import Notification from "types/entities/Notification";

export interface IToastContext {
  notifications: Notification[];
  dispatch: any;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

export function ToastContextProvider({ children }: Props) {
  const notificationsArray: Notification[] = [];

  const [notifications, dispatch] = useReducer((toasts: any, action: any) => {
    switch (action.type) {
      case ADD_NOTIFICATION:
        return [...toasts, action.payload];
      case DELETE_NOTIFICATION:
        return toasts.filter(
          (notification: Notification) => notification.id !== action.payload,
        );
      default:
        return toasts;
    }
  }, notificationsArray);

  const toastObject: IToastContext = useMemo(
    () => ({
      notifications,
      dispatch,
    }),
    [notifications, dispatch],
  );

  return (
    <ToastContext.Provider value={toastObject}>
      {children}
    </ToastContext.Provider>
  );
}
