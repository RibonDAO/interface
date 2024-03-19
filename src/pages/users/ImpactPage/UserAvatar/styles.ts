import styled from "styled-components";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
  defaultBodyXsMedium,
} from "styles/typography/default";

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

export const AvatarContainer = styled.div`
  width: 92px;
  height: 92px;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  border: 2px solid ${({ theme }) => theme.colors.neutral[25]};
  border-radius: ${({ theme }) => theme.spacing(8)};
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral[25]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: ${({ theme }) => theme.spacing(16)};
  }
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
  border-radius: ${({ theme }) => theme.spacing(8)};
  object-fit: cover;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-left: ${({ theme }) => theme.spacing(16)};
  }
`;

export const TagContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
`;

export const ClubTag = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 8)};
  border-radius: 30px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[50]};
`;

export const TagText = styled.p`
  ${defaultBodyXsMedium}

  color:  ${({ theme }) => theme.colors.brand.tertiary[600]};
`;

export const VerifiedIcon = styled.img``;

export const LeftSparkle = styled.img`
  position: absolute;
  bottom: 0;
  left: -16px;
`;

export const RightSparkle = styled.img`
  position: absolute;
  top: 0;
  right: -16px;
`;
