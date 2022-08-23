import styled from "styled-components";

export const Container = styled.div`
  max-width: 360px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoaderContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DividerContainer = styled.span`
  margin: 20px 156px;
  text-align: center;
`;

export const AnimationText = styled.h2`
  margin: 8px 0 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.ribonBlue};
`;

export const ImpactText = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;
