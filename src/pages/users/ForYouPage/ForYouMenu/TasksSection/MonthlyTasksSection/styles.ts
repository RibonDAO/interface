import styled from "styled-components";
import { defaultBodyLgBold } from "styles/typography/default";

export const Container = styled.div<{ isMobile: boolean }>`
  width: 100%;
  margin-left: ${({ theme, isMobile }) => (isMobile ? 0 : theme.spacing(24))};
`;

export const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
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
