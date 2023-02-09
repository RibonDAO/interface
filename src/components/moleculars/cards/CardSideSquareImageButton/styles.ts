import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const Container = styled.div`
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(24)};
  display: flex;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Text = styled.p`
  margin-top: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const InsideContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(16)};
`;

export const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const SideButton = styled(Button)`
  ${defaultBodyXsSemibold}

  height: 28px;
  padding: ${({ theme }) => theme.spacing(8, 16)};
  border-radius: 16px;
`;
