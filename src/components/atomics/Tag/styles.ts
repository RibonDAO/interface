import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";

export const Text = styled.p<{ textColor?: string }>`
  ${defaultBodyXsRegular}

  color:  ${({ theme, textColor }) => textColor || theme.colors.neutral10};
`;
export const Container = styled.div<{ backgroundColor?: string }>`
  min-width: 50px;
  height: 28px;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.brand.primary[900]};
`;
