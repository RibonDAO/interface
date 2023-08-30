import styled from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const ProgressBarContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProgressFill = styled.progress`
  width: 100%;
  min-width: 312px;
  height: 16px;
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.13);

  ::-moz-progress-bar {
    background-color: ${({ theme }) => theme.colors.brand.tertiary[300]};
    transition: width 1.5s ease-in-out;
  }

  ::-webkit-progress-value {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.brand.tertiary[300]};
    transition: width 1.5s ease-in-out;
  }

  ::-webkit-progress-bar {
    padding: 2px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.neutral[25]};
  }
`;

export const ProgressInfo = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

export const LeftInfo = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const RightInfo = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[25]};
`;
