import styled from "styled-components";

export const NotificationContainer = styled.div`
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: ${({ theme }) => theme.zindex.toast};
  box-sizing: border-box;
  font-size: 14px;
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
  width: 336px;
  margin: 0 0 6px;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  right: 12px;
  bottom: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGray};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
  opacity: 0.9;
  pointer-events: auto;
  transition: 0.3s ease;
  animation: toast-in-right 0.7s;

  &:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
    opacity: 1;
    cursor: pointer;
  }
`;

export const Message = styled.span`
  margin: 0;
  margin-left: -1px;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.white};
`;

export const Link = styled.span`
  float: right;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
`;

export const LinkNotificationToast = styled.a`
  text-decoration: none;
`;
