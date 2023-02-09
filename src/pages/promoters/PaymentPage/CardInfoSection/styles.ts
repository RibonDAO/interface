import styled from "styled-components";

export const PaymentInformationSectionContainer = styled.div<{
  colorTheme: any;
}>`
  height: 256px;
  margin-top: ${({ theme }) => theme.spacing(20)};

  * > input {
    border: 1px solid ${({ colorTheme }) => colorTheme.shade40} !important;
    color: ${({ colorTheme }) => colorTheme.shade20} !important;
  }

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

export const Form = styled.form`
  input {
    height: 48px;
    border: 1px solid ${({ theme }) => theme.colors.brand.secondary[700]};
    color: ${({ theme }) => theme.colors.brand.secondary[300]};

    ::placeholder {
      color: ${({ theme }) => theme.colors.neutral[200]};
    }
  }
`;
