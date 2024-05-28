import styled from "styled-components";
import { defaultBodyLgSemibold } from "styles/typography/default";

export const Container = styled.div`
  max-width: 900px;
  margin-bottom: ${({ theme }) => theme.spacing(48)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
  }
`;

export const NonProfitImage = styled.img`
  width: 100%;
  max-height: 240px;
  border-radius: 0;
  position: relative;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    border-radius: 8px;
    left: initial;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  flex-basis: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 432px;
    margin-right: ${({ theme }) => theme.spacing(40)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-right: ${({ theme }) => theme.spacing(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 110%;
    margin: 0 -16px;
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
