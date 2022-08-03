import styled, { css } from "styled-components";
import ReactModal from "react-modal";

export const BlankModal = styled(ReactModal)`
  background-color: #fff;
  width: 100%;
  border-radius: 16px;
  margin: 16px;
  max-width: 360px;
`;

export const Modal = styled(BlankModal)`
  button,
  a {
    margin-bottom: 8px;

    &:last-child {
      margin: 0;
    }
  }
`;

export const ModalWithIcon = styled(Modal)`
  padding: 16px;
`;

export const ModalWithImage = styled(Modal)`
  overflow: hidden;
`;

export const Container = styled.div`
  padding: 16px;
`;

export const Icon = styled.img`
  display: block;
  width: 96px;
  height: 96px;
  margin: -64px auto 8px auto;
`;

export const Image = styled.img`
  width: 100%;
  height: 152px;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.h2<TitleProps>`
  ${({ theme, color }) => css`
    text-align: center;
    color: ${color || theme.colors.ribonBlack};
  `}
`;

export const Body = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    text-align: center;
    margin: 8px 0px 20px;
  `}
`;

export const HighlightedText = styled.p`
  ${({ theme }) => css`
    margin-top: 16px;
    font-weight: bold;
    text-align: center;
    color: ${theme.colors.ribonBlack};
    font-size: 16px;
  `}
`;
export const RowsModalRow = styled.div`
  display: flex;
  margin-bottom: 28px;
`;
