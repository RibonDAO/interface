import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";
import HalfCircle from "./assets/half-circle.svg";

export const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(24)};
  border-radius: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
  background-image: url(${HalfCircle});
  background-position: top center;
  background-repeat: no-repeat;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(12)};
`;

export const Image = styled.img`
  max-width: 112px;
`;

export const Title = styled.h1`
  ${stylizedDisplaySm}
`;

export const Subtitle = styled.p`
  ${defaultBodySmRegular}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const Brands = styled.img`
  filter: brightness(0);
`;

export const Cta = styled.span`
  ${defaultBodyMdSemibold}

  margin-top: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.brand.primary[600]};
  }
`;
