import styled from "styled-components";
import {
  defaultBodyXsBold,
  defaultBodyXsMedium,
} from "styles/typography/default";

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
  }
`;

export const AvatarContainer = styled.div`
  width: 72px;
  height: 72px;
  padding: ${({ theme }) => theme.spacing(12)};
  background-color: ${({ theme }) => theme.colors.neutral[25]};
  border-radius: 8px;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: ${({ theme }) => theme.spacing(16)};
  }
`;

export const LevelLabel = styled.span`
  ${defaultBodyXsBold};
  display: inline-flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[50]};
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
  position: absolute;
  min-width: 54px;
  top: -16px;
  right: -16px;
`;

export const AvatarTitle = styled.p`
  ${defaultBodyXsMedium}
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[25]};
  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
`;
