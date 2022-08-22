import styled, { css } from "styled-components";

export const NotificationContainer = styled.div`
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 9999;
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
  ${({ theme }) => css`
    background: ${theme.colors.white};
    transition: 0.3s ease;
    position: relative;
    pointer-events: auto;
    overflow: hidden;
    padding: 20px;
    margin: 0 0 6px;
    margin-bottom: 15px;
    width: 336px;
    color: ${theme.colors.black};
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
  `}
`;

export const Message = styled.span`
  ${({ theme }) => css`
    margin: 0;
    text-align: left;
    margin-left: -1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: ${theme.colors.white};
  `}
`;

export const Link = styled.span`
  ${({ theme }) => css`
    float: right;
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: bold;
  `}
`;

export const LinkNotificationToast = styled.a`
  text-decoration: none;
`;
