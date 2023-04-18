import styled from "styled-components";
import {
  defaultBodyLgBold,
  defaultBodySmBold,
  defaultBodySmMedium,
} from "styles/typography/default";

export const Container = styled.div``;

export const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.p`
  ${defaultBodyLgBold}

  margin-left: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const CheckboxContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const ProgressBar = styled.div`
  margin-top: ${({ theme }) => theme.spacing(16)};
  margin-bottom: ${({ theme }) => theme.spacing(32)};
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
  width: 57px;
  height: 57px;
  margin-right: ${({ theme }) => theme.spacing(20)};
  margin-left: ${({ theme }) => theme.spacing(4)};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  object-fit: contain;
  padding: ${({ theme }) => theme.spacing(8)};
`;
