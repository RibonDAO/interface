import styled from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const ProgressBarContainer = styled.div`
  width: 100%;
  min-width: 312px;
  margin-top: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

export const ProgressInfo = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

export const LeftInfo = styled.p`
  ${defaultBodySmMedium}

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const RightInfo = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }) => theme.spacing(4)};
`;
