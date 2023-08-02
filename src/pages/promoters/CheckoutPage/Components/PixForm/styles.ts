import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import styled from "styled-components";

export const Container = styled.div`
  padding-inline: ${({ theme }) => theme.spacing(16)};
`;

export const Half = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const DonateButtonContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-inline: 0;
    padding-bottom: 0;
    position: relative;
    background-color: transparent;
  }
`;

export const CountryInput = styled(InputAutoComplete)``;
