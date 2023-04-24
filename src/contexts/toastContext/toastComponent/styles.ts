import styled from "styled-components";
import {
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const NotificationToast = styled.div`
  min-width: 336px;
  margin: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(20)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 8px;
  position: fixed;
  z-index: ${({ theme }) => theme.zindex.navigator};
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.neutral[800]};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
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
  ${defaultBodySmMedium}

  margin-left: ${({ theme }) => theme.spacing(8)};
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Link = styled.a`
  ${defaultBodySmSemibold}

  margin: ${({ theme }) => theme.spacing(0, 24, 0, 8)};
  float: right;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Icon = styled.img`
  margin-right: ${({ theme }) => theme.spacing(8)};
`;

export const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: ${({ theme }) => theme.spacing(24)};
  float: right;
`;

export const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
