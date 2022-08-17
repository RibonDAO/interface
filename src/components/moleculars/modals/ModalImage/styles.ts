import styled from "styled-components";
import { Modal } from "../ModalBlank/styles";

export const ModalWithImage = styled(Modal)`
  overflow: hidden;
`;

export const Container = styled.div`
  padding: 16px;
`;

export const Image = styled.img`
  width: 100%;
  height: 152px;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.h2<TitleProps>`
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.black};
`;

export const Body = styled.h3`
  margin: 8px 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;
