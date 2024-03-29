import { Input } from "components/moleculars/modals/ModalForm/styles";
import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
  defaultBodySmSemibold,
  defaultBodyXsBold,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PixContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    max-width: 424px;
    padding: ${({ theme }) => theme.spacing(32)};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.neutral10};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow10};
  }
`;

export const InformationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Half = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const SmallTextInfo = styled.span`
  ${defaultBodyXsRegular}

  margin-left: ${({ theme }) => theme.spacing(4)};

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const SmallTextInfoContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(16)};
  display: flex;
  cursor: default;
`;

export const Title = styled.h3`
  ${defaultBodySmSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const InstructionsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(24)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const InstructionsInfo = styled.span`
  ${defaultBodySmRegular}

  margin-bottom: ${({ theme }) => theme.spacing(20)};
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Number = styled.div`
  ${defaultBodyXsBold}

  width: 24px;
  height: 24px;
  margin-right: ${({ theme }) => theme.spacing(8)};
  padding: 8px;
  border-radius: 100px;
  display: flex;

  gap: 8px;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.brand.primary[50]};
  color: ${({ theme }) => theme.colors.brand.primary[500]};
`;

export const ExpiresAt = styled.span`
  ${defaultBodyXsRegular}

  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const QRCode = styled.img`
  width: 200px;
  height: 200px;
`;

export const PixCode = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PayableName = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.primary[600]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${defaultBodyMdSemibold}
  }
`;

export const BackButton = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: flex-start;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;
