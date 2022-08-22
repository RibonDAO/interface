import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import Divider from "components/atomics/Divider";
import LottieAnimation from "components/atomics/LottieAnimation";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-gap: 0; // grid-template-rows: [line-2] 80px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 340px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  padding: 28px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContainer = styled.div`
  padding: 0 20px;
`;

export const Title = styled.h5`
  margin-top: 20px;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.black};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.h6`
  margin-top: 4px;
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 20px;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  align-self: end;
  background-color: white;
  box-shadow: 0 -4px 4px ${({ theme }) => theme.colors.lightShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 340px;
    padding: 0;
    box-shadow: none;
  }
`;

export const HrDivider = styled(Divider)`
  width: 50px;
  padding: 0 100px;
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;

export const HeartAnimation = styled(LottieAnimation)``;
