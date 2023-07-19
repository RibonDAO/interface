import styled, { css } from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
  defaultBodySmSemibold,
  defaultHeadingXxs,
} from "styles/typography/default";
import Button from "../../../atomics/buttons/Button";

export const Container = styled.div<{
  backgroundImage?: string;
  flexDirection?: string;
  backgroundColor?: string;
}>`
  width: 100%;
  max-width: 472px;
  max-height: 128px;
  padding: ${({ theme }) => theme.spacing(16, 16, 16)};
  border-radius: 8px;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  box-sizing: border-box;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;

  ${(props) =>
    props.flexDirection === "row" &&
    css`
      justify-content: space-between;
      cursor: pointer;
    `}
`;

export const Content = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(8)};
`;

export const IconText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3<{
  size?: string;
  color?: string;
}>`
  ${defaultHeadingXxs}

  ${(props) =>
    props.size === "large" &&
    css`
      ${defaultHeadingXxs}
    `}

    ${(props) =>
    props.size === "medium" &&
    css`
      ${defaultBodyMdSemibold}
    `}

  color: ${({ theme, color }) => color || theme.colors.neutral10};
`;

export const Subtitle = styled.h4<{
  size?: string;
  color?: string;
}>`
  ${(props) =>
    props.size === "small" &&
    css`
      ${defaultBodySmSemibold}
    `}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme, color }) => color || theme.colors.neutral10};
`;

export const Text = styled.h5`
  ${defaultBodySmRegular}

  margin-top: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme, color }) => color || theme.colors.neutral[800]};
`;

export const ChildrenContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
`;

export const CardButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
`;

export const ArrowContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-self: center;
`;
