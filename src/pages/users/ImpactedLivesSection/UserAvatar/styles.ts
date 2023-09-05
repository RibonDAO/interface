import styled from "styled-components";
import {
  defaultBodySmRegular,
  defaultBodyXsBold,
} from "styles/typography/default";

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    flex-direction: row;
  }
`;

export const AvatarContainer = styled.div`
  width: 72px;
  height: 72px;
  padding: ${({ theme }) => theme.spacing(12)};
  border-radius: 8px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral[25]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: ${({ theme }) => theme.spacing(16)};
  }
`;

export const LevelLabel = styled.span`
  ${defaultBodyXsBold}

  min-width: 54px;
  padding: 4px 8px;
  border-radius: 100px;
  position: absolute;
  top: -16px;
  right: -16px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[50]};
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const AvatarTitle = styled.p`
  ${defaultBodySmRegular}

  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
`;