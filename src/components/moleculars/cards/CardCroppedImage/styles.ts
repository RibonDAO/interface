import styled from "styled-components";
import WaveCut from "assets/images/wave-cut.svg";
import { defaultSubtitleMedium } from "styles/typography/default";

export const Container = styled.div`
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  display: flex;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SupportImage = styled.img`
  mask-image: url(${WaveCut});
  mask-size: 100% 100%;
  width: 100%;
  height: 136px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray10};
`;

export const MainText = styled.h1`
  color: ${({ theme }) => theme.colors.green20};
`;

export const SubText = styled.h2`
  ${defaultSubtitleMedium}
  
  color: ${({ theme }) => theme.colors.gray30};
`;
