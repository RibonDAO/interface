import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { Modal } from "../ModalBlank/styles";

export const ModalWithIcon = styled(Modal)`
  padding: 16px;
`;

export const Icon = styled.img`
  height: 96px;
  margin: -64px auto 8px;
  display: block;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.h2<TitleProps>`
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.gray40};
`;

export const Body = styled.h3`
  margin: 8px 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const HighlightedText = styled.h4`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray40};
`;
export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;

export const SupportButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.green30};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme, color }) => color || theme.colors.green30};
`;
