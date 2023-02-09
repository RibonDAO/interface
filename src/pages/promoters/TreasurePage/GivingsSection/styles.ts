import styled from "styled-components";
import {
  defaultBodySmSemibold,
  defaultBodyMdBold,
} from "styles/typography/default";

export const Container = styled.div``;

export const TextLastCard = styled.h4`
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const LastCardCarousel = styled.a`
  width: 206px;
  height: 123px;
  margin: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const GivingText = styled.span`
  ${defaultBodySmSemibold}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CardBlank = styled.div`
  max-width: 206px;
  padding: ${({ theme }) => theme.spacing(20, 32, 12)};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const Image = styled.img`
  height: 40px;
`;

export const SectionTitle = styled.h2`
  ${defaultBodyMdBold}

  margin-top: ${({ theme }) => theme.spacing(32)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
