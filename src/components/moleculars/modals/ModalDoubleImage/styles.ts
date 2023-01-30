import styled from "styled-components";
import { Modal } from "../ModalBlank/styles";

export const ModalWithDoubleImage = styled(Modal)`
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

type DoubleImageProps = {
  hasAdjacent?: boolean;
};

export const Title = styled.h3<TitleProps>`
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.gray40};
`;

export const Body = styled.h4`
  margin: ${({ theme }) => theme.spacing(0, 0, 20)};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const HighlightedText = styled.h4`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const RowsModalRow = styled.div`
  margin-bottom: 28px;
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 170px;
  height: 100px;
  margin: -64px auto 8px;
  position: relative;
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const LeftImage = styled.img<DoubleImageProps>`
  width: 90px;
  height: 90px;
  border: solid 2px ${({ theme }) => theme.colors.defaultShadow};
  border-radius: 50%;
  position: ${({ hasAdjacent }) => (hasAdjacent ? "absolute" : "relative")};
  left: 0;
  z-index: ${({ theme }) => theme.zindex.above};
  object-fit: contain;
  background: ${({ theme }) => theme.colors.neutral10};
  filter: drop-shadow(0 20px 40px ${({ theme }) => theme.colors.defaultShadow});
`;

export const RightImage = styled.img<DoubleImageProps>`
  width: 90px;
  height: 90px;
  border: solid 2px ${({ theme }) => theme.colors.defaultShadow};
  border-radius: 50%;
  position: ${({ hasAdjacent }) => (hasAdjacent ? "absolute" : "relative")};
  right: 0;
  object-fit: cover;
  filter: drop-shadow(0 20px 40px ${({ theme }) => theme.colors.defaultShadow});
`;
