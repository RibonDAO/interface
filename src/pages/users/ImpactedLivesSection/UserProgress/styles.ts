import styled from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const ProgressBarContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 312px;
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
