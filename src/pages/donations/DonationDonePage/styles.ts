import styled, { css } from "styled-components";
import Button from "components/atomics/Button";
import Divider from "components/atomics/Divider";
import LottieAnimation from "components/atomics/LottieAnimation";

export const Container = styled.div`
  ${() => css`
    display: grid;
    grid-gap: 0px; // grid-template-rows: [line-2] 80px;
    height: 100vh;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      max-width: 340px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
  `}
`;

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 0px;
  `}
`;

export const InnerContainer = styled.div`
  ${() => css`
    padding: 0px 20px;
  `}
`;

export const Title = styled.h5`
  ${() => css`
    color: ${({ theme }) => theme.colors.ribonBlack};
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    line-height: 160%;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      font-size: 24px;
    }
  `}
`;

export const Subtitle = styled.h6`
  ${() => css`
    color: ${({ theme }) => theme.colors.darkGray};
    margin-top: 4px;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 160%;
    text-align: center;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      font-size: 20px;
    }
  `}
`;

export const ButtonContainer = styled.div`
  ${() => css`
    box-shadow: 0px -4px 4px rgba(24, 86, 105, 0.15);
    height: 80px;
    background-color: white;
    width: 100%;
    padding: 12px 16px;
    align-self: end;
    display: flex;
    align-items: center;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      box-shadow: none;
      padding: 0;
      max-width: 340px;
    }
  `}
`;

export const HrDivider = styled(Divider)`
  padding: 0 100px;
  width: 50px;
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;

export const HeartAnimation = styled(LottieAnimation)``;
