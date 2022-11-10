import styled from "styled-components";

export const PaymentInformationSectionContainer = styled.div`
  height: 256px;
  margin-top: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const Title = styled.h3`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const Half = styled.div`
  display: flex;

  div:first-of-type {
    margin-right: 8px;
  }
`;

export const Form = styled.form`
  input {
    height: 48px;
    border: 1px solid ${({ theme }) => theme.colors.orange40};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.orange20};

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray20};
    }
  }
`;
