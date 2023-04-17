import styled from "styled-components";
import {
  defaultBodySmBold,
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";

interface NotificationProps {
  type: "success" | "warning" | "error" | "informational";
}

export const Container = styled.div<NotificationProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.neutral[800]};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, type }) => {
    switch (type) {
      case "success":
        return theme.colors.feedback.success[500];
      case "warning":
        return theme.colors.feedback.warning[500];
      case "error":
        return theme.colors.feedback.error[500];
      case "informational":
        return theme.colors.feedback.informational[400];
      default:
        return theme.colors.neutral10;
    }
  }};
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "success":
        return theme.colors.feedback.success[50];
      case "warning":
        return theme.colors.feedback.warning[50];
      case "error":
        return theme.colors.feedback.error[50];
      case "informational":
        return theme.colors.feedback.informational[40];
      default:
        return theme.colors.neutral10;
    }
  }};
`;

export const TextContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing(16)};
`;
export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  ${defaultBodySmSemibold};
`;

export const Description = styled.p`
  ${defaultBodySmRegular};
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Link = styled.p`
  ${defaultBodySmBold};
  margin-top: 0;
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing(16)};
  text-decoration: underline;
`;
