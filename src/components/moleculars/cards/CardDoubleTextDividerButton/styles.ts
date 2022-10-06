import { AuxiliarText } from "components/atomics/typography/AuxiliarText/styles";
import { Span } from "components/atomics/typography/Spans/styles";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 206px;
  height: 123px;
  margin: 8px;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const FirstText = styled(AuxiliarText)`
  font-style: italic;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const MainContent = styled.h2<{
  processing?: boolean;
}>`
  color: ${(props) =>
    props.processing ? props.theme.colors.gray30 : props.theme.colors.green30};
`;

export const RightMainContent = styled(Span)<{
  processing?: boolean;
}>`
  color: ${(props) =>
    props.processing ? props.theme.colors.gray30 : props.theme.colors.green30};
`;

export const LinkSection = styled.a`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray40};
`;

export const SpinnerSection = styled.a`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.green30};
`;

export const Image = styled.img``;
