import { theme as sharedTheme } from "@ribon.io/shared/styles";
import styled from "styled-components";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const Container = styled.div`
  margin-block: ${({ theme }) => theme.spacing(32)};
  max-width: 900px;
`;

const customScrollBar = `
  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${sharedTheme.colors.neutral[50]}; 
  }

  ::-webkit-scrollbar-thumb {
    background: ${sharedTheme.colors.brand.primary[700]}; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${sharedTheme.colors.brand.primary[400]};
  }

  @media (max-width: ${sharedTheme.breakpoints.pad}) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SideScroll = styled.div`
  margin: ${({ theme }) => theme.spacing(16)} 0;

  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
  overflow-x: auto;

  ${customScrollBar}
`;

export const Card = styled.div`
  width: 150px;
  min-width: 140px;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(16)}
    ${({ theme }) => theme.spacing(24)};
  border-radius: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[100]};
  user-select: none;

  :hover {
    background-color: ${({ theme }) => theme.colors.brand.primary[200]};
    cursor: pointer;
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Link = styled.span`
  ${defaultBodySmSemibold}

  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const Title = styled.h2`
  ${defaultBodyLgSemibold}
`;

export const Subtitle = styled.p`
  ${defaultBodySmRegular}
`;

export const Arrow = styled.img`
  width: 18px;
  height: 18px;
`;
