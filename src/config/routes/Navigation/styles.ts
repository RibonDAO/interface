import styled, { css } from "styled-components";
import theme from "styles/theme";
import { Link } from "react-router-dom";

type Props = {
  enabled: boolean;
};

export const ContainerDesktop = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 50px 0px 50px;
    width: 80px;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
  `}
`;

export const ContainerMobile = styled.div`
  ${() => css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    width: 100%;
    align-self: flex-end;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(24, 86, 105, 0.15);
  `}
`;

export const Title = styled.p`
  ${({ enabled }: Props) => css`
    color: ${enabled ? theme.colors.ribonBlack : theme.colors.darkGray};
    text-decoration: none;
  `}
`;

export const StyledLink = styled(Link)`
  ${() => css`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `}
`;

export const Icon = styled.img`
  ${() => css`
    height: 32px;
  `}
`;
