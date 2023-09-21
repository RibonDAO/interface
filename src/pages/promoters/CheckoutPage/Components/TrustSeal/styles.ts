import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-left: ${({ theme }) => theme.spacing(16)};
  }
`;

export const SealText = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const SealImage = styled.img``;
