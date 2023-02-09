import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import Divider from "components/atomics/Divider";
import LottieAnimation from "components/atomics/LottieAnimation";

export const Container = styled.div`
  padding-inline: 16px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-gap: 0;

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
  padding: ${({ theme }) => theme.spacing(32, 0)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 20)};
`;

export const Title = styled.h3`
  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Subtitle = styled.h4`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  display: flex;
  align-items: center;
  align-self: end;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 340px;
    padding: ${({ theme }) => theme.spacing(0)};
    box-shadow: none;
  }
`;

export const HrDivider = styled(Divider)`
  width: 50px;
  padding: ${({ theme }) => theme.spacing(0, 112)};
`;

export const FinishButton = styled(Button)`
  height: 50px;
`;

export const HeartAnimation = styled(LottieAnimation)``;
