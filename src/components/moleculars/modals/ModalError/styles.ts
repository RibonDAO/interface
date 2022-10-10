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

export const Title = styled.h3<TitleProps>`
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.darkGray};
`;

export const Body = styled.h4`
  margin: 8px 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;
