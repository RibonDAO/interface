import styled from "styled-components";
import { defaultBodyLgSemibold } from "styles/typography/default";

export const Container = styled.div<{ isMobile: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing(48)};
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  align-items: center;
`;

export const NonProfitImage = styled.img<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "110%" : "100%")};
  border-radius: ${({ isMobile }) => (isMobile ? "0" : "8px")};
  position: relative;
  left: ${({ isMobile }) => (isMobile ? "-16px" : "initial")};
`;

export const ImageContainer = styled.div<{ isMobile: boolean }>`
  margin-right: ${({ theme, isMobile }) => (isMobile ? 0 : theme.spacing(40))};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  ${defaultBodyLgSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
