import styled, { css } from "styled-components";
import Button from "components/atomics/buttons/Button";

export const Container = styled.div`
  ${({ theme }) => css`
  height: 100%;
  display: flex;
  margin-top: 24px;
  @media (min-width: ${theme.breakpoints.pad}) {
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
  `}
`;

export const Text = styled.h4`
  ${({ theme }) => css`
    font-weight: 400;
    line-height: 24px;
    margin-top: 4px;
    color: ${theme.colors.darkGray};
  `}
`;

export const RightContainer = styled.div`
  ${() => css``}
`;
export const LeftContainer = styled.div`
  ${() => css`
    margin-right: 14px;
  `}
`;

export const ImageContainer = styled.div`
  height: 96px;
  width: 96px;
  margin-bottom: 8px;
`;

export const SideButton = styled(Button)`
  border-radius: 16px;
  font-size: 12px;
  height: 28px;
`;
