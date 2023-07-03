import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodyMdRegular,
  defaultHeadingXxs,
} from "styles/typography/default";
import Icon from "components/atomics/Icon";
import { Modal } from "../ModalBlank/styles";

export const Container = styled(Modal)`
  max-width: 360px;
  padding: ${({ theme }) => theme.spacing(24)};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-width: ${() => window.innerWidth}px;
    border-radius: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transform: translateY(300px);
    animation: swipeUp 0.2s ease-in-out forwards;

    @keyframes swipeUp {
      0% {
        transform: translateY(300px);
      }

      100% {
        transform: translateY(0);
      }
    }
  }
`;

export const Title = styled.h1`
  ${defaultHeadingXxs}

  margin-top: ${({ theme }) => theme.spacing(16)};
`;

export const HighlightedText = styled.h1`
  ${defaultBodyMdBold}

  margin-top: ${({ theme }) => theme.spacing(16)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.brand.primary[600]};
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}

  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const CloseIcon = styled(Icon)`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  display: flex;
  align-self: flex-end;
  cursor: pointer;
`;
