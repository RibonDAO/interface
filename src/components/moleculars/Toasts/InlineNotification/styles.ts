import styled from "styled-components";

interface NotificationProps {
  type: "success" | "warning" | "error" | "informational";
}

export const Container = styled.div<NotificationProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  border-width: 1px;
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

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  margin: 0;
`;

export const Links = styled.div`
  margin-top: 8px;
`;

export const Link = styled.a`
  margin-right: 8px;
`;
