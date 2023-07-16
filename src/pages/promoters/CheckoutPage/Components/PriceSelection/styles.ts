import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";

export const Container = styled.div``;

export const Offer = styled.span`
  ${stylizedDisplayMd}

  margin-block: ${({ theme }) => theme.spacing(8)};
  display: flex;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const EditButton = styled.button`
  width: 40px;
  height: 40px;
  margin-left: ${({ theme }) => theme.spacing(8)};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primary[100]};
    cursor: pointer;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoaderShape = styled.div`
  margin-block: ${({ theme }) => theme.spacing(8)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }

    50% {
      background-color: ${({ theme }) => theme.colors.neutral[100]};
    }

    100% {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }
  }
`;

export const SmallTextInfoWrapper = styled.div`
  margin-block: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(16)};
`;

export const SmallTextInfo = styled.span`
  display: flex;
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;
