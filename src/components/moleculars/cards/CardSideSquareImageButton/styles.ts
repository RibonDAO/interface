import styled from "styled-components";
import { AuxiliarButton } from "components/atomics/typography/AuxiliarButtonText/styles";

export const Container = styled.div`
  height: 100%;
  margin-top: 24px;
  display: flex;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.gray40};
`;

export const Text = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const InsideContainer = styled.div`
  margin-right: 14px;
`;

export const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 8px;
`;

export const SideButton = styled(AuxiliarButton)`
  height: 28px;
  border-radius: 16px;
`;
