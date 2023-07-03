import styled from "styled-components";
import { defaultBodyLgSemibold } from "styles/typography/default";

export const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(48)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
  }
`;

export const NonProfitImage = styled.img`
  width: 110%;
  border-radius: 0;
  position: relative;
  left: -16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    border-radius: 8px;
    left: initial;
  }
`;

export const ImageContainer = styled.div`
  margin-right: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: ${({ theme }) => theme.spacing(40)};
  }
`;

export const NonProfitTitle = styled.h1`
  ${defaultBodyLgSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Title = styled.h1`
  ${defaultBodyLgSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
