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
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  padding: 16px;
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
  border-radius: 8px;
  display: flex;
  flex-direction: row;
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
  color: ${({ theme }) => theme.colors.neutral[800]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    align-items: center;
    justify-content: space-between;
  }
`;

export const TextContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing(16)};
`;
export const LeftContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: row;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    align-items: center;
    justify-content: flex-end;
  }
`;

export const CloseIconContainer = styled.div`
  width: 40px;
  height: 40px;
  padding: ${({ theme }) => theme.spacing(8)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const Title = styled.h3`
  ${defaultBodySmSemibold}
`;

export const Description = styled.p`
  ${defaultBodySmRegular}
`;

export const Links = styled.div`
  min-width: 100px;
  margin-top: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: 0;
    flex-direction: row;
  }
`;

export const Link = styled.p`
  ${defaultBodySmBold}

  margin-top: 0;
  margin-right: ${({ theme }) => theme.spacing(8)};
  padding-top: ${({ theme }) => theme.spacing(8)};
  padding-bottom: ${({ theme }) => theme.spacing(8)};
  text-decoration: underline;
  cursor: pointer;
`;
