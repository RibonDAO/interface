import styled from "styled-components";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
  defaultBodyXsBold,
} from "styles/typography/default";

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
    text-align: left;
  }
`;

export const AvatarContainer = styled.div`
  width: 72px;
  height: 72px;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  border: 2px solid ${({ theme }) => theme.colors.neutral[25]};
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

export const Username = styled.p`
  ${defaultBodyLgSemibold}

  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const Email = styled.p`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
`;
