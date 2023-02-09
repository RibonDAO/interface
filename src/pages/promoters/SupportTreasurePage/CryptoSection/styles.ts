import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import {
  defaultBodyXsRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const Container = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(48)};
`;

export const Subtitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing(20)};
`;

export const Label = styled.p`
  ${defaultBodySmSemibold}

  margin-top: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(12)};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConnectContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 92px;
  height: 92px;
  margin-top: ${({ theme }) => theme.spacing(112)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: ${({ theme }) => theme.spacing(48)};
  }
`;

export const Input = styled.input`
  ${defaultBodySmSemibold}

  width: 100%;
  height: 39px;
  margin-top: ${({ theme }) => theme.spacing(12)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(8)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[300]};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const UsdcIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const UsdcContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing(8)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UsdcText = styled.p`
  margin-left: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Text = styled.p`
  ${defaultBodyXsRegular}

  margin-top: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.primary[300]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-self: end;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 -4px 4px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 60px;
    padding: ${({ theme }) => theme.spacing(0)};
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
  padding: ${({ theme }) => theme.spacing(8, 16)};
`;

export const ExtraText = styled.h6`
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  font-weight: ${({ theme }) => theme.font.light};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;
