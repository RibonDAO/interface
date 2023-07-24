import styled from "styled-components";
import { Link } from "react-router-dom";
import { defaultBodyXsRegular } from "styles/typography/default";

type Props = {
  theme: any;
  enabled: boolean;
};

export const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4, 12)};
  position: fixed;
  bottom: 0;
  z-index: ${({ theme }) => theme.zindex.navbar};
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-self: flex-end;
  justify-content: space-around;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 -2px 4px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 80px;
    min-height: 100vh;
    padding: ${({ theme }) => theme.spacing(64, 0)};
    position: fixed;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    justify-content: flex-start;
    background: ${({ theme }) => theme.colors.neutral10};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
  }
`;

export const Title = styled.p`
  ${defaultBodyXsRegular}

  text-decoration: none;
  color: ${({ theme, enabled }: Props) =>
    enabled ? theme.colors.neutral[800] : theme.colors.neutral[500]};
`;

export const StyledLinkContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(8, 0)};
  display: flex;
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
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
  height: 30px;
`;

export const RedBall = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  position: absolute;
  top: 0px;
  left: 68%;
  align-self: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.feedback.error[500]};
`;

export const NewLabel = styled.span`
  display: flex;
  width: 28px;
  height: 16px;
  padding: 2px 4px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  right: 0;
  top: -8px;
  border-radius: 30px;
  ${defaultBodyXsRegular};
  font-size: 8px;
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  background-color: ${({ theme }) => theme.colors.feedback.success[50]};
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
