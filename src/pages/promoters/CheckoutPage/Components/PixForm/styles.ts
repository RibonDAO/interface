import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";

export const Container = styled.div`
  padding-inline: ${({ theme }) => theme.spacing(16)};
`;

export const Half = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const DonateButtonContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
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

export const SmallTextInfo = styled.span`
  ${defaultBodyXsRegular}

  margin-left: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const SmallTextInfoContainer = styled.div`
  display: flex;
  cursor: default;
`;
