import styled, { css } from "styled-components";

export const BillingInformationSectionContainer = styled.div`
  margin-top: 24px;
`;

export const Title = styled.h6`
  ${({ theme }) => css`
    margin: 20px 0;
    font-weight: 700;
    color: ${theme.colors.ribonBlack};
    font-size: 18px;
    line-height: 25.6px;
  `}
`;

export const Form = styled.form`
  & :nth-child(2) {
    margin-right: 4px;
  }
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid ${theme.colors.ribonBlue};
    border-radius: 8px;
    padding: 8px 16px 8px 16px;
  `}
`;

export const HalfInput = styled.input`
  ${({ theme }) => css`
    display: inline-block;
    width: calc(50% - 4px);
    margin-bottom: 12px;
    border: 1px solid ${theme.colors.ribonBlue};
    border-radius: 8px;
    padding: 8px 16px 8px 16px;
  `}
`;
