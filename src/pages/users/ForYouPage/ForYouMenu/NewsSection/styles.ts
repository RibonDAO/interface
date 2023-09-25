import styled from "styled-components";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(40)};
`;

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(32)};
  align-items: flex-end;
  justify-content: center;
`;

export const Image = styled.img``;

export const Title = styled.p`
  ${stylizedDisplaySm}

  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.brand.primary[900]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: ${({ theme }) => theme.spacing(24)};
  }
`;

export const Text = styled.h2`
  ${defaultBodyMdSemibold}

  margin-top: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
`;

export const Button = styled.button`
  ${defaultBodyMdSemibold}

  width: 328px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: none;
  border-radius: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral10};
  margin-top: ${({ theme }) => theme.spacing(32)};
`;

export const BlockedContainer = styled.div`
  max-width: 328px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: 56px;
  }
`;
