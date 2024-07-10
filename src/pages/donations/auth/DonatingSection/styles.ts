import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const AnimationContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(24)};
  align-items: center;
`;

export const LoadingContainer = styled.div`
  height: 40px;
  padding: 0 20px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[100]};
`;

export const BottomContainer = styled.div`
  margin-bottom: 72px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
`;
export const LoadingText = styled.p`
  ${defaultBodySmSemibold}

  text-align: center;
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
