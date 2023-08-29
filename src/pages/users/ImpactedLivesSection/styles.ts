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
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AvatarContainer = styled.div`
  width: 72px;
  height: 72px;
  padding: ${({ theme }) => theme.spacing(12)};
  margin-top: ${({ theme }) => theme.spacing(40)};
  background-color: ${({ theme }) => theme.colors.neutral[25]};
  border-radius: 8px;
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
