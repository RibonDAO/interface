import { useContext } from "react";
import Notification from "types/entities/Notification";
import SuccessIcon from "./assets/success-icon.svg";
import ErrorIcon from "./assets/error-icon.svg";
import WarningIcon from "./assets/warning-icon.svg";
import InfoIcon from "./assets/info-icon.svg";
import * as S from "./styles";
import { ToastContext } from "..";

function Toast() {
  const { notifications } = useContext(ToastContext);

  const iconToast = (type: string) => {
    switch (type) {
      case "success":
        return SuccessIcon;
      case "error":
        return ErrorIcon;
      case "warning":
        return WarningIcon;
      case "info":
        return InfoIcon;
      default:
        return InfoIcon;
    }
  };

  return (
    <S.NotificationContainer>
      {notifications.map((notification: Notification) => {
        const index = notifications.indexOf(notification);
        return (
          <S.LinkNotificationToast
            href={notification.link}
            target="_blank"
            key={index}
          >
            <S.NotificationToast
              style={{
                backgroundColor: notifications[index].color,
              }}
              key={index}
            >
              <S.Icon src={iconToast(notification.type)} />
              <S.Message>{notification.message}</S.Message>
              {notification.link && <S.Link>{notification.linkMessage}</S.Link>}
              {notification.linkName2 && <S.Link>{notification.link2}</S.Link>}
            </S.NotificationToast>
          </S.LinkNotificationToast>
        );
      })}
    </S.NotificationContainer>
  );
}

export default Toast;
