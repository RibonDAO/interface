import styled from "styled-components";
import { defaultSubtitleMedium } from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RibonsAmount = styled.p`
  ${defaultSubtitleMedium}

  margin-right: 2px;
  color: ${({ theme }) => theme.colors.green30};
`;

export const Sparkle = styled.img`
  width: 20px;
  height: 20px;
`;
