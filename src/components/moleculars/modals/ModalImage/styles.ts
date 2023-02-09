import styled from "styled-components";
import { Modal } from "../ModalBlank/styles";

export const ModalWithImage = styled(Modal)`
  overflow: hidden;
`;

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(16)};
`;

export const Image = styled.img`
  width: 100%;
  height: 152px;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.h3<TitleProps>`
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.neutral[800]};
`;

export const Body = styled.h4`
  margin: ${({ theme }) => theme.spacing(8, 0, 20)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const RowsModalRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
`;
