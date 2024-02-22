import styled, { css } from "styled-components";
import {
  defaultBodySmRegular,
  defaultHeadingXs,
  defaultBodyLgBold,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div<{
  textColor?: string;
  titleColor?: string;
  size?: string;
  biggerContainer?: boolean;
}>`
  ${(props) =>
    props.size === "small" &&
    !props.biggerContainer &&
    css`
      width: 48%;
    `}

  ${(props) =>
    props.size === "small" &&
    props.biggerContainer &&
    css`
      max-width: 48%;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      width: 100%;
      min-width: 230px;
    `}    

  height: ${({ biggerContainer }) => biggerContainer && "128px"};

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(16)};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-grow: ${({ biggerContainer }) => biggerContainer && "1"};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: ${({ biggerContainer }) =>
      biggerContainer ? "250px" : "230px"};
  }
`;

export const Image = styled.img<{
  size?: string;
}>`
  ${(props) =>
    props.size === "small" &&
    css`
      width: 24px;
      height: 24px;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      width: 72px;
      height: 72px;
      border-radius: 50%;
    `}

  display: block;
  object-fit: cover;
`;

export const Text = styled.p<{
  textColor?: string;
  isLocked?: boolean;
}>`
  ${defaultBodyXsRegular}

  margin-top: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme, textColor }) => textColor || theme.colors.neutral[500]};
  filter: ${({ isLocked }) => isLocked && "blur(5px)"};
`;

export const Title = styled.span<{
  size?: string;
  titleColor?: string;
  isLocked?: boolean;
}>`
  ${(props) =>
    props.size === "small" &&
    css`
      ${defaultBodyLgBold}

      @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
        ${defaultHeadingXs}
      }
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      ${defaultBodySmRegular}
    `}

  -webkit-touch-callout: none;
  margin-top: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme, titleColor }) =>
    titleColor || theme.colors.brand.primary[800]};
  filter: ${({ isLocked }) => isLocked && "blur(5px)"};
  user-select: none;
`;

export const Label = styled.span`
  ${defaultBodyXsRegular}

  padding: 4px 8px;
  border-radius: 30px;
  position: absolute;
  top: ${({ theme }) => theme.spacing(16)};
  right: ${({ theme }) => theme.spacing(16)};
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;
