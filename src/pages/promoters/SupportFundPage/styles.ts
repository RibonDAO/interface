import styled, { css } from "styled-components";
import Button from "components/atomics/Button";

export const Container = styled.div`
  ${() => css`
    height: 100vh;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      max-width: 472px;
      display: flex;
      flex-direction: column;
    }
  `}
`;

export const CardSectionContainer = styled.div`
  margin-top: 24px;
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 4px 0;
  font-weight: 900;
  margin-bottom: 48px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 24px;
    }
  `}
`;

export const Subtitle = styled.p`
  margin-top: 20px;
  font-weight: 700;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 18px;
    }
  `}
`;

export const Text = styled.p`
  ${({ theme }) => css`
    margin-top: 8px;
    font-weight: ${theme.font.normal};
    font-size: 12px;
    color: ${theme.colors.ribonBlue};

    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 14px;
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
    position: fixed;
    bottom: 0;
    left: 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      box-shadow: none;
      padding: 0;
      position: static;
      height: 60px;

      button {
        height: 40px;
      }
    }
  `}
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;

export const CardValueButton = styled(Button)`
  ${() => css`
    border-radius: 66px;
    height: 30px;
    max-width: 112px;
  `}
`;

export const ValuesContainer = styled.div`
  ${() => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    }
    grid-template-columns: 1fr 1fr 1fr 1fr;
    display: grid;
    grid-gap: 8px;
    width: 100%;
    margin-top: 12px;
    margin-bottom: 36px;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    height: 39px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${theme.colors.ribonBlue};
    padding: 8px;
    margin-top: 12px;
    margin-bottom: 8px;
    color: ${theme.colors.darkGray};
    font-weight: ${theme.font.bold};
  `}
`;

export const InputContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    }
  `}
`;

export const UsdcIcon = styled.img`
  ${() => css`
    height: 24px;
    width: 24px;
  `}
`;

export const UsdcContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
  `}
`;

export const UsdcText = styled.p`
  ${({ theme }) => css`
    margin-left: 4px;
    color: ${theme.colors.ribonBlack};
    font-size: 14px;
  `}
`;

export const GivingValue = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 24px;
    margin-top: 4px;
    line-height: 38.4px;
    font-weight: 900;
  `}
`;

export const NetGivingValue = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 14px;
    line-height: 23.8px;
  `}
`;

export const ServiceFeesValue = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 14px;
    line-height: 23.8px;
  `}
`;

export const CryptoGivingValue = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: 12px;
    line-height: 19.2px;
    font-style: italic;
    margin-bottom: 32px;
  `}
`;
