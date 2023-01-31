import styled from "styled-components";
import {
  defaultBodyXsRegular,
  defaultHeadingXs,
} from "styles/typography/default";
import { getPrimary } from "styles/colors/utils";

export const Container = styled.div`
  max-width: 206px;
  height: 123px;
  margin: 8px;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const FirstText = styled.p`
  ${defaultBodyXsRegular}

  font-style: italic;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const MainContent = styled.h3<{
  processing?: boolean;
  refunded?: boolean;
}>`
  ${defaultHeadingXs}

  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.processing
      ? props.theme.colors.gray30
      : props.refunded
      ? props.theme.colors.gray20
      : getPrimary(props.theme).colorBrandPrimary300};
`;

export const RightMainContent = styled.span<{
  processing?: boolean;
  refunded?: boolean;
}>`
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.processing
      ? props.theme.colors.gray30
      : props.refunded
      ? props.theme.colors.gray20
      : getPrimary(props.theme).colorBrandPrimary300};
`;

export const LinkSection = styled.a<{
  refunded?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: ${(props) =>
    props.refunded ? props.theme.colors.gray20 : props.theme.colors.gray40};
`;

export const SpinnerSection = styled.a`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
`;

export const Image = styled.img``;
