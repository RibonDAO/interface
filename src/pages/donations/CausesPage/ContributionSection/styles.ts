import styled from "styled-components";
import { defaultBodyLgSemibold } from "styles/typography/default";

export const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(48)};
  width: 100%;
`;

export const NonProfitImage = styled.img``;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ theme }) => theme.spacing(40)};
`;

export const Title = styled.h1`
  ${defaultBodyLgSemibold}
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing(24)};
`;
