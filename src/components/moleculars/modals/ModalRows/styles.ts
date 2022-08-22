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

export const Animation = styled.div`
  width: 50%;
  height: 50%;
  margin: -100px auto 5px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const RowsModalContainer = styled.div`
  padding-top: 16px;
`;

export const RowsModalSection = styled.div`
  margin-top: 50px;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;

export const RowsModalIcon = styled.img`
  display: flex;
`;

export const RowsModalText = styled.h4`
  display: flex;
  align-items: center;
  line-height: 23px;
`;
