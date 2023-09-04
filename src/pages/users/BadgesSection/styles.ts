import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(32)};
  margin-bottom: ${({ theme }) => theme.spacing(32)};
`;

export const BadgesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const BadgeContainer = styled.div<{ achieved: boolean }>`
  opacity: ${({ achieved }) => (achieved ? 1 : 0.5)};
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin-bottom: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const BadgeImage = styled.img`
  width: 96px;
  height: 96px;
`;
