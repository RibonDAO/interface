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
    border-radius: 8px;
    padding: ${({ theme }) => theme.spacing(32)};
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
  display: flex;
  cursor: default;
  margin-top: ${({ theme }) => theme.spacing(16)};
`;

export const Title = styled.h3`
  ${defaultBodySmSemibold}
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  margin-top: ${({ theme }) => theme.spacing(24)};
`;

export const InstructionsInfo = styled.span`
  ${defaultBodySmRegular}
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing(20)};
`;

export const Number = styled.div`
  ${defaultBodyXsBold}
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.brand.primary[50]};
  color: ${({ theme }) => theme.colors.brand.primary[500]};
  margin-right: ${({ theme }) => theme.spacing(8)};
`;

export const ExpiresAt = styled.span`
  ${defaultBodyXsRegular}
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-top: ${({ theme }) => theme.spacing(8)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
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
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: flex-start;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;

  margin-bottom: ${({ theme }) => theme.spacing(24)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;
