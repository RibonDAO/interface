import styled from "styled-components";

export const PaymentInformationSectionContainer = styled.form`
  height: 256px;
  margin-top: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const Title = styled.h3`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Half = styled.div`
  display: flex;

  div:first-of-type {
    margin-right: 8px;
  }
`;
