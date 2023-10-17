import styled from "styled-components";
import { defaultBodyLgBold } from "styles/typography/default";

export const Countdown = styled.p`
  ${defaultBodyLgBold}

  margin-right: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
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
