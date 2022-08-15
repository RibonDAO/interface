import styled, { css } from "styled-components";
import ReactModal from "react-modal";

export const BlankModal = styled(ReactModal)`
  background-color: #ffffff;
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

export const Icon = styled.img`
  display: block;
  width: 96px;
  height: 96px;
  margin: -64px auto 8px auto;
`;

export const BiggerIcon = styled.img`
  display: block;
  margin: -64px auto 16px auto;
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
    margin-bottom: 8px;
  `}
`;

export const FormContainer = styled.div`
  ${() => css`
    padding: 8px 0px;
  `}
`;
export const Input = styled.input`
  ${({ theme }) => css`
    height: 39px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${theme.colors.ribonBlue};
    padding: 8px;
    margin-bottom: 8px;
  `}
`;

export const FooterContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${theme.colors.ribonGray};
  `}
`;
