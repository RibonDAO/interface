import styled from "styled-components";
import {
  defaultBodyMdRegular,
  defaultHeadingXxs,
} from "styles/typography/default";
import Icon from "components/atomics/Icon";
import { Modal } from "../ModalBlank/styles";

export const Container = styled(Modal)`
  min-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(24)};
  background-color: ${({ theme }) => theme.colors.neutral10};
  border-radius: 4px;
`;

export const Title = styled.h1`
  ${defaultHeadingXxs}
  margin-top: ${({ theme }) => theme.spacing(16)};
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const CloseIcon = styled(Icon)`
  display: flex;
  align-self: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;
