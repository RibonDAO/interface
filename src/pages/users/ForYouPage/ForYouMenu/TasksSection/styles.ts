import styled from "styled-components";
import { defaultBodyLgBold } from "styles/typography/default";

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

export const TimerWrapper = styled.div`
  width: 100%;
  height: 48px;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: 0 ${({ theme }) => theme.spacing(16)};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
`;

export const Countdown = styled.p`
  ${defaultBodyLgBold}

  margin-right: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
