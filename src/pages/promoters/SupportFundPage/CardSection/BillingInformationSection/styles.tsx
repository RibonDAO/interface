import styled from "styled-components";

export const BillingInformationSectionContainer = styled.div`
  margin-top: 24px;
  height: 256px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const Title = styled.h6`
  margin: 20px 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  line-height: 25.6px;
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
  border: 1px solid ${({ theme }) => theme.colors.ribonBlue};
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
`;
