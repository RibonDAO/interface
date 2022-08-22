import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  theme: any;
  enabled: boolean;
};

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: space-around;
    padding: 3px 12px;
    position: fixed;
    bottom: 0;
    width: 100%;
    align-self: flex-end;
    background: ${theme.colors.white};
    box-shadow: 0px -2px 4px rgba(24, 86, 105, 0.15);
    z-index: 2;

    @media (min-width: ${theme.breakpoints.pad}) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 56px 0px;
      max-width: 80px;
      position: fixed;
      align-self: flex-start;
      justify-content: flex-start;
      min-height: 100vh;
      background: ${theme.colors.white}
      box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
    }
  `}
`;

export const Title = styled.p`
  ${({ theme, enabled }: Props) => css`
    color: ${enabled ? theme.colors.black : theme.colors.darkGray};
    text-decoration: none;
    font-size: 12px;
    line-height: 16px;
  `}
`;

export const StyledLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    gap: 2px;
    flex-direction: column;
    padding: 8px 0px;
    @media (min-width: ${theme.breakpoints.pad}) {
      gap: 6px;
    }
  `}
`;

export const Icon = styled.img`
  ${() => css`
    height: 24px;
  `}
`;
