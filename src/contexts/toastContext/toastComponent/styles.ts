import styled from "styled-components";
import {
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const NotificationToast = styled.div`
  width: 336px;
  margin: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(20)};
  border-radius: 8px;
  position: fixed;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.neutral[800]};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
  opacity: 0.9;
  pointer-events: auto;
  transition: 0.3s ease;
  animation: toast-in-right 0.7s;
  align-items: center;
  justify-content: space-between;
  display: flex;

  &:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
    opacity: 1;
    cursor: pointer;
  }
`;

export const Message = styled.span`
  ${defaultBodySmMedium}
  margin: ${({ theme }) => theme.spacing(0)};
  margin-left: -1px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Link = styled.a`
  ${defaultBodySmSemibold}

  float: right;
  margin-left: ${({ theme }) => theme.spacing(8)};
  margin-right: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Icon = styled.img`
  margin-right: ${({ theme }) => theme.spacing(8)};
`;

export const CloseIcon = styled.img`
  height: 24px;
  width: 24px;

  margin-left: ${({ theme }) => theme.spacing(24)};
`;
