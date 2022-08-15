import styled, { css } from "styled-components";
import Button from "components/atomics/buttons/Button";

export const Subtitle = styled.p`
  margin-top: 20px;
  font-weight: 700;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 18px;
    }
  `}
`;

export const Label = styled.p`
  margin-top: 24px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
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

export const ConnectContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    width: 92px;
    height: 92px;
    margin-top: 100px;
    @media (min-width: ${theme.breakpoints.pad}) {
      margin-top: 50px;
    }
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

export const ConnectButton = styled(Button)`
  ${() => css`
    width: 160px;
    padding: 7px 16px;
  `}
`;
