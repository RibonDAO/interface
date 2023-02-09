import styled from "styled-components";
import { defaultBodyXsMedium } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { Modal } from "../ModalBlank/styles";

export const ModalWithIcon = styled(Modal)`
  padding: ${({ theme }) => theme.spacing(16)};
`;

export const Icon = styled.img`
  height: 96px;
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

export const Title = styled.h3<TitleProps>`
  ${stylizedDisplayXs}

  margin-top: -16px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.neutral[800]};
`;

export const Body = styled.h3`
  ${defaultBodyXsMedium}

  margin: ${({ theme }) => theme.spacing(8, 0, 14)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const RowsModalContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing(16)};
`;

export const RowsModalSection = styled.div`
  padding: ${({ theme }) => theme.spacing(0)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RowsModalRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
`;

export const RowsModalIcon = styled.img`
  display: flex;
`;

export const RowsModalText = styled.h4`
  display: flex;
  align-items: center;
`;
