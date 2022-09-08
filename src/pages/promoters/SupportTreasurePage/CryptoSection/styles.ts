import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import { AuxiliarText } from "components/atomics/typography/AuxiliarText/styles";
import {
  BoldInput,
  BoldP,
} from "components/atomics/typography/BoldText/styles";

export const Subtitle = styled.h3`
  margin-top: 20px;
`;

export const Label = styled(BoldP)`
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 92px;
  height: 92px;
  margin-top: 100px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: 50px;
  }
`;

export const Input = styled(BoldInput)`
  width: 100%;
  height: 39px;
  margin-top: 12px;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.mediumGreen};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const UsdcIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const UsdcContainer = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UsdcText = styled.p`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Text = styled(AuxiliarText)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: 12px 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-self: end;
  background-color: white;
  box-shadow: 0 -4px 4px ${({ theme }) => theme.colors.lightShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 60px;
    padding: 0;
    position: static;
    box-shadow: none;

    button {
      height: 40px;
    }
  }
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;

export const ConnectButton = styled(Button)`
  width: 160px;
  padding: 7px 16px;
`;
