import styled from "styled-components";
import {
  defaultBodySmBold,
  defaultBodySmMedium,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
`;

export const IntegrationContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(24)};
  display: flex;
  flex-direction: row;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const IntegrationTitle = styled.p`
  ${defaultBodySmBold}

  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const Link = styled.a`
  ${defaultBodySmMedium}

  text-decoration: underline;
  color: ${({ theme }) => theme.colors.neutral[600]};
  cursor: pointer;
`;

export const RightContainer = styled.div`
  display: flex;
`;

export const Image = styled.img`
  width: 64px;
  height: 64px;
  margin-right: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => theme.spacing(8)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 4px;
  object-fit: contain;
`;
