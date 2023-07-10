import styled from "styled-components";
import {
  defaultBodySmMedium,
  defaultHeadingXxs,
} from "styles/typography/default";

export const Container = styled.div`
  display: block;
`;

export const Data = styled.h1<{
  color?: string;
}>`
  ${defaultHeadingXxs}

  color: ${(props) => props.color || props.theme.colors.neutral[700]};
`;

export const Label = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[600]};
`;
