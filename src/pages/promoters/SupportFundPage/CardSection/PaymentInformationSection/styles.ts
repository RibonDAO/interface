import styled from "styled-components";

export const PaymentInformationSectionContainer = styled.form`
  height: 256px;
  margin-top: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const Title = styled.h6`
  margin: 20px 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 25.6px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Half = styled.div`
  display: flex;

  div:first-of-type {
    margin-right: 8px;
  }
`;
