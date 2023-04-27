import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultBodyMdBold } from "styles/typography/default";
import { Modal } from "../ModalBlank/styles";

export const ModalWithIcon = styled(Modal)`
  padding: ${({ theme }) => theme.spacing(16)};
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
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.neutral[800]};
`;

export const Body = styled.h4`
  margin: ${({ theme }) => theme.spacing(0, 0, 20)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const HighlightedText = styled.p`
  ${defaultBodyMdBold}

  margin-top: ${({ theme }) => theme.spacing(16)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const RowsModalRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
`;
export const SupportButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[300]};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme, color }) => color || theme.colors.brand.primary[300]};
`;
