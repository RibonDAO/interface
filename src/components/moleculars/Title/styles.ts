import styled from "styled-components";
import {
  defaultBodyMdRegular,
  defaultHeadingXxs,
} from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(12)};
  align-items: center;
`;

export const Title = styled.h1`
  ${defaultHeadingXxs}
`;

export const Subtitle = styled.p`
  ${defaultBodyMdRegular}

  color: ${({ theme }) => theme.colors.neutral[700]};
`;
export const IconBox = styled.div<{
  secondaryColor: string;
}>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.secondaryColor || props.theme.colors.neutral10};
`;

export const TextContainer = styled.div``;
