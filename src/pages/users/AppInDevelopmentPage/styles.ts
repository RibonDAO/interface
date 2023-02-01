import styled from "styled-components";
import { defaultBodyMdBold } from "styles/typography/default";

export const Title = styled.p``;

export const Description = styled.p`
  ${defaultBodyMdBold}
  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral50};
`;
