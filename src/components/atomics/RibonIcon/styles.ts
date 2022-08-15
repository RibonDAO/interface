import styled, { css } from "styled-components";
import { Props } from ".";

export const Container = styled.div<Props>`
  display: inline;
  ${({ color }) => css`
    color: ${color!};
  `}
`;
