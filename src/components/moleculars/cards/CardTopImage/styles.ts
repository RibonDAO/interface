import styled, { css } from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodySmRegular,
  defaultBodyXsMedium,
} from "styles/typography/default";

export const Container = styled.div<{
  textColor?: string;
  titleColor?: string;
  size?: string;
}>`
  ${(props) =>
    props.size === "small" &&
    css`
      width: 48%;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      width: 100%;
      min-width: 230px;
    `}

  margin-bottom: 8px;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 230px;
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
  size?: string;
}>`
  ${(props) =>
    props.size === "small" &&
    css`
      ${defaultBodyXsMedium}

      font-weight: 400;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      ${defaultBodySmRegular}
    `}

  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const Title = styled.span<{
  size?: string;
}>`
  ${(props) =>
    props.size === "small" &&
    css`
      ${defaultBodyMdBold}
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      ${defaultBodySmRegular}
    `}

  margin-top: 8px;
  color: ${({ theme }) => theme.colors.green40};
`;
