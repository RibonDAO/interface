import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div``;

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin: ${({ theme }) => theme.spacing(12, 0)};
`;

export const NonProfitsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(20)};
`;

export const CausesCardContainer = styled.div``;

export const NonProfitsListContainer = styled.div`
  margin-inline: -16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 0;
    max-width: 900px;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.brand.primary[300]};
  }
`;

export const CardWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  margin-left: ${({ theme }) => theme.spacing(16)};
  overflow: visible;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 12px;
    margin-left: 0px;

    :nth-of-type(1) {
      margin-left: 0px;
    }
  }
`;
