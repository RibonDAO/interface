import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import styled from "styled-components";

export const Container = styled.div``;

export const Half = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const DonateButtonContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(16)};
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
