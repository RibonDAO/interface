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
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.black};
`;

export const FormContainer = styled.div`
  padding: 8px 0;
`;
export const Input = styled.input`
  width: 100%;
  height: 39px;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.ribonBlue};
  border-radius: 8px;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.ribonGray};
`;
