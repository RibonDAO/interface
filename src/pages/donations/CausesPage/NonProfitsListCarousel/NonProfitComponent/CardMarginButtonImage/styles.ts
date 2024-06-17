import styled from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const ContentContainer = styled.div`
  width: 296px;
  height: 432px;
  padding: ${({ theme }) => theme.spacing(40, 32)};
  border-radius: ${({ theme }) => theme.spacing(16)};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: center;
  justify-content: center;
`;

export const BorderImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`;

export const TopImage = styled.img`
  max-width: 68px;
  max-height: 83px;
  z-index: 1;
`;

export const BottomImage = styled.img`
  max-width: 80px;
  max-height: 80px;
  z-index: 1;
`;

export const Description = styled.p`
  ${defaultBodySmMedium}

  margin: ${({ theme }) => theme.spacing(4, 0)};
  z-index: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(12)};
`;
