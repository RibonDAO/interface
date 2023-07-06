import styled, { css } from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const Container = styled.div<{
  position?: "center" | "start";
}>`
  ${(props) =>
    props.position === "center" &&
    css`
      align-items: center;
    `}

  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const Subtitle = styled.p<{
  color?: string;
}>`
  ${defaultBodySmMedium}

  color: ${(props) => props.color || props.theme.colors.brand.tertiary[800]};
`;

export const IconBox = styled.div<{
  secondaryColor?: string;
  position?: "center" | "start";
}>`
  ${(props) =>
    props.position === "center" &&
    css`
      align-items: center;
    `}

  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) =>
    props.secondaryColor || props.theme.colors.neutral10};
`;
