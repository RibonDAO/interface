import { useContext } from "react";
import Notification from "types/entities/Notification";
import { ToastContext } from "..";
import * as S from "./styles";

function Toast() {
  const { notifications } = useContext(ToastContext);

  return (
    <S.NotificationContainer>
      {notifications.map((notification: Notification) => {
        const index = notifications.indexOf(notification);
        return (
          <S.NotificationToast
            style={{
              backgroundColor: notifications[index].color,
            }}
            key={index}
          >
            <S.Message>{notification.message}</S.Message>
            {notification.link && (
              <S.Link href={notification.link}>
                {notification.linkMessage}
              </S.Link>
            )}
          </S.NotificationToast>
        );
      })}
    </S.NotificationContainer>
  );
}

export default Toast;
