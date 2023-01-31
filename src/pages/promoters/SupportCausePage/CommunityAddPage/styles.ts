import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Button from "components/atomics/buttons/Button";

export const DesktopContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-height: 100vh;
    padding: ${({ theme }) => theme.spacing(32)};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(40, 36, 28, 60%);
  }
`;

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(16)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 408px;
    align-self: center;
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayXs}

  text-align: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(64)};
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  cursor: pointer;
`;

export const DonateButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(64)};
`;
