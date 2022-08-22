import styled from "styled-components";
import Button from "components/atomics/buttons/Button";

export const Subtitle = styled.p`
  margin-top: 20px;
  font-weight: 700;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 18px;
  }
`;

export const Label = styled.p`
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 16px;
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

export const Input = styled.input`
  width: 100%;
  height: 39px;
  margin-top: 12px;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.ribonBlue};
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.darkGray};
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
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Text = styled.p`
  margin-top: 8px;
  font-weight: ${({ theme }) => theme.font.normal};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.ribonBlue};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 14px;
  }
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
