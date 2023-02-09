import styled, { css } from "styled-components";
import {
  defaultBodySmRegular,
  defaultHeadingXs,
  defaultBodyLgBold,
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

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(16)};
  border-radius: 8px;
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

export const Text = styled.p`
  ${defaultBodySmRegular}

  margin-top: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Title = styled.span<{
  size?: string;
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

  margin-top: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;
