import Button from "components/atomics/buttons/Button";
import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    align-items: center;
    justify-content: center;
    width: 70%;
  `}
`;

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-weight: 700;
    margin-top: 28px;
    text-align: center;
  `}
`;

export const EmptyDonationButton = styled(Button)`
  ${() => css`
    margin-top: 14px;
    width: 200px;
  `}
`;
