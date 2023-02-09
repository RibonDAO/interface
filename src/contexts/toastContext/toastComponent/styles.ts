import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";

export const NotificationContainer = styled.div`
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: ${({ theme }) => theme.zindex.toast};
  box-sizing: border-box;
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
  margin: ${({ theme }) => theme.spacing(0, 0, 8)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(20)};
  border-radius: 8px;
  position: relative;
  right: 12px;
  bottom: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.neutral[800]};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
  opacity: 0.9;
  pointer-events: auto;
  transition: 0.3s ease;
  animation: toast-in-right 0.7s;

  &:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
    opacity: 1;
    cursor: pointer;
  }
`;

export const Message = styled.span`
  margin: ${({ theme }) => theme.spacing(0)};
  margin-left: -1px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Link = styled.span`
  ${defaultBodySmSemibold}

  float: right;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const LinkNotificationToast = styled.a`
  text-decoration: none;
`;
