import styled from "styled-components";
import { defaultBodyXsMedium } from "styles/typography/default";
import Background from "./assets/background.svg";

export const Container = styled.div`
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: 32px;
  min-height: 322px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.brand.primary[800]};
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-height: 164px;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-right: ${({ theme }) => theme.spacing(16)};
  }
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
