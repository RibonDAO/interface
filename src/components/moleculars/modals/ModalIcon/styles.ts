import styled from "styled-components";
import { Modal } from "../ModalBlank/styles";

export const ModalWithIcon = styled(Modal)`
  padding: 16px;
`;

export const Icon = styled.img`
  height: 80px;
  margin: -64px auto 8px;
  display: block;
`;

export const BiggerIcon = styled(Icon)`
  height: 100px;
`;

export const RoundIcon = styled(Icon)`
  border-radius: 70px;
  object-fit: cover;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.h2<TitleProps>`
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.darkGray};
`;

export const Body = styled.h3`
  margin: 0 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const HighlightedText = styled.p`
  margin-top: 16px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;
