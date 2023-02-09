import styled from "styled-components";
import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import InputText from "components/atomics/inputs/InputText";

export const BillingInformationSectionContainer = styled.div<{
  colorTheme: any;
}>`
  margin-top: ${({ theme }) => theme.spacing(16)};
  height: 256px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }

  * > input {
    border: 1px solid ${({ colorTheme }) => colorTheme.shade40} !important;
    color: ${({ colorTheme }) => colorTheme.shade20} !important;
  }
`;

export const Title = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Form = styled.form`
  input {
    border: 1px solid ${({ theme }) => theme.colors.brand.secondary[700]};
    color: ${({ theme }) => theme.colors.brand.secondary[300]};
    font-weight: 600;
    height: 48px;

    ::placeholder {
      color: ${({ theme }) => theme.colors.neutral[200]};
    }
  }

  & :nth-child(2) {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;

export const HalfInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HalfInput = styled(InputText)``;

export const CountryInput = styled(InputAutoComplete)`
  input {
    border: 1px solid ${({ theme }) => theme.colors.brand.secondary[700]};
  }
`;

export const TaxIdInput = styled(InputText)``;
