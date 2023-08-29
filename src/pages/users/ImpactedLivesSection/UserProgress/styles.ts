import styled from "styled-components";
import {
  defaultBodyXsMedium,
  defaultBodyXsSemibold,
} from "styles/typography/default";

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(8)};
`;

export const ProgressFill = styled.progress`
  min-width: 312px;
  width: 100%;
  height: 16px;
  border-radius: 4px;

  ::-moz-progress-bar {
    background-color: ${({ theme }) => theme.colors.brand.tertiary[300]};
    transition: width 1.5s ease-in-out;
  }

  ::-webkit-progress-value {
    transition: width 1.5s ease-in-out;
    background-color: ${({ theme }) => theme.colors.brand.tertiary[300]};
    border-radius: 4px;
  }

  ::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.neutral[25]};
    border-radius: 4px;
    padding: 2px;
  }
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.13);
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

export const LeftInfo = styled.p`
  ${defaultBodyXsSemibold}
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const RightInfo = styled.p`
  ${defaultBodyXsMedium}
  color: ${({ theme }) => theme.colors.neutral[25]};
`;
