import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  theme: any;
  enabled: boolean;
};

export const Container = styled.div`
  width: 100%;
  padding: 3px 12px;
  position: fixed;
  bottom: 0;
  z-index: ${({ theme }) => theme.zindex.navbar};
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-self: flex-end;
  justify-content: space-around;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -2px 4px ${({ theme }) => theme.colors.lightShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 80px;
    min-height: 100vh;
    padding: 56px 0;
    position: fixed;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    justify-content: flex-start;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
  }
`;

export const Title = styled.p`
  font-size: 12px;
  line-height: 16px;
  text-decoration: none;
  color: ${({ theme, enabled }: Props) =>
    enabled ? theme.colors.darkGray : theme.colors.mediumGray};
`;

export const StyledLink = styled(Link)`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: space-between;
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    gap: 6px;
  }
`;

export const Icon = styled.img`
  height: 24px;
`;
