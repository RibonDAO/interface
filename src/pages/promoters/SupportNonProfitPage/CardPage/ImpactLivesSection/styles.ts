import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  height: 172px;
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  padding: ${({ theme }) => theme.spacing(0, 112, 0, 112)};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[25]};
`;

export const Title = styled.h1`
  ${defaultBodyMdSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Subtitle = styled.h2`
  ${defaultBodySmRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const ProgressContainer = styled.div`
  width: 100%;

  p {
    color: ${({ theme }) => theme.colors.neutral[800]};
  }
`;

export const BackgroundShape = styled.img`
  position: absolute;
  right: 0;
`
