import styled from "styled-components";

export const BillingInformationSectionContainer = styled.div`
  margin-top: 18px;
  height: 256px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const Title = styled.h3`
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const Form = styled.form`
  & :nth-child(2) {
    margin-right: 4px;
  }
`;

export const HalfInput = styled.input`
  display: inline-block;
  width: calc(50% - 4px);
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  border: 1px solid ${({ theme }) => theme.colors.green30};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(8, 16, 8, 16)};
`;
