import { createContext, useMemo, useReducer } from "react";
import Notification from "types/entities/Notification";

export interface IToastContext {
  notificationsState: any;
  dispatch: any;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export function ToastContextProvider({ children }: Props) {
  const notifications: Notification[] = [];

  const [notificationsState, dispatch] = useReducer(
    (toasts: any, action: any) => {
      switch (action.type) {
        case "ADD_NOTIFICATION":
          return [...toasts, action.payload];
        case "DELETE_NOTIFICATION":
          return toasts.filter(
            (notification: Notification) => notification.id !== action.payload,
          );
        default:
          return toasts;
      }
    },
    notifications,
  );

  const toastObject: IToastContext = useMemo(
    () => ({
      notificationsState,
      dispatch,
    }),
    [notificationsState, dispatch],
  );

  return (
    <ToastContext.Provider value={toastObject}>
      {children}
    </ToastContext.Provider>
  );
}
