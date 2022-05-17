import styled from "styled-components";

export const NotificationContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  font-size: 14px;
  z-index: 9999;
  bottom: 12px;
  right: 12px;
  animation: toast-in-right 0.7s;

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const NotificationToast = styled.div`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  padding: 20px;
  margin: 0 0 6px;
  margin-bottom: 15px;
  width: 336px;
  color: #000;
  opacity: 0.9;
  box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
  border-radius: 8px;
  bottom: 12px;
  right: 12px;
  animation: toast-in-right 0.7s;
  &:hover {
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    opacity: 1;
    cursor: pointer;
  }
`;

export const Message = styled.span`
  margin: 0;
  text-align: left;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
`;

export const Link = styled.span`
  float: right;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const LinkNotificationToast = styled.a`
  text-decoration: none;
`;
