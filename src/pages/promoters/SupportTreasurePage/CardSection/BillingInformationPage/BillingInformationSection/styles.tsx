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
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.green30};
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
`;
