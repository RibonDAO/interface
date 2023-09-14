import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[25]};
  border-radius: 8px;
  height: 172px;
  padding: ${({ theme }) => theme.spacing(0, 112, 0, 112)};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(32)};
`;

export const Title = styled.h1`
  ${defaultBodyMdSemibold}
  color: ${({ theme }) => theme.colors.neutral[800]};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Subtitle = styled.h2`
  ${defaultBodySmRegular}
  color: ${({ theme }) => theme.colors.neutral[800]};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
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
