import styled from "styled-components";
import { defaultBodyMdBold } from "styles/typography/default";
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

export const Title = styled.h3<TitleProps>`
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.gray40};
`;

export const Body = styled.h4`
  margin: 0 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const HighlightedText = styled.p`
  ${defaultBodyMdBold}

  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;
