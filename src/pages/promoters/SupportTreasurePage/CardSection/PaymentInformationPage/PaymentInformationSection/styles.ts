import styled from "styled-components";

export const PaymentInformationSectionContainer = styled.form`
  height: 256px;
  margin-top: ${({ theme }) => theme.spacing(20)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const Title = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Half = styled.div`
  display: flex;

  div:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(8)};
  }
`;
