import styled from "styled-components";
import { defaultBodyLgSemibold } from "styles/typography/default";

export const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(48)};
`;

export const NonProfitImage = styled.img<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "110%" : "100%")};
  left: ${({ isMobile }) => (isMobile ? "-16px" : "initial")};
  position: relative;
  border-radius: ${({ isMobile }) => (isMobile ? "0" : "8px")};
`;

export const ImageContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  margin-right: ${({ theme, isMobile }) => (isMobile ? 0 : theme.spacing(40))};
`;

export const Title = styled.h1`
  ${defaultBodyLgSemibold}
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing(24)};
`;
