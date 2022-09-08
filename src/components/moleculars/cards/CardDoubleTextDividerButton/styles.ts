import { AuxiliarText } from "components/atomics/typography/AuxiliarText/styles";
import { Span } from "components/atomics/typography/Spans/styles";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 206px;
  height: 123px;
  margin: 8px;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.lightShadow};
`;

export const FirstText = styled(AuxiliarText)`
  font-style: italic;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const MainContent = styled.h2<{
  processing?: boolean;
}>`
  color: ${(props) =>
    props.processing
      ? props.theme.colors.mediumGray
      : props.theme.colors.mediumGreen};
`;

export const RightMainContent = styled(Span)<{
  processing?: boolean;
}>`
  color: ${(props) =>
    props.processing
      ? props.theme.colors.mediumGray
      : props.theme.colors.mediumGreen};
`;

export const LinkSection = styled.a`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const SpinnerSection = styled.a`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.mediumGreen};
`;

export const Image = styled.img``;
