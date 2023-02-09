import styled from "styled-components";
import {
  defaultBodyXsRegular,
  defaultHeadingXs,
} from "styles/typography/default";

export const Container = styled.div`
  max-width: 206px;
  height: 123px;
  margin: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const FirstText = styled.p`
  ${defaultBodyXsRegular}

  font-style: italic;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const MainContent = styled.h3<{
  processing?: boolean;
  refunded?: boolean;
}>`
  ${defaultHeadingXs}

  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.processing
      ? props.theme.colors.neutral[500]
      : props.refunded
      ? props.theme.colors.neutral[200]
      : props.theme.colors.brand.primary[300]};
`;

export const RightMainContent = styled.span<{
  processing?: boolean;
  refunded?: boolean;
}>`
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.processing
      ? props.theme.colors.neutral[500]
      : props.refunded
      ? props.theme.colors.neutral[200]
      : props.theme.colors.brand.primary[300]};
`;

export const LinkSection = styled.a<{
  refunded?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: ${(props) =>
    props.refunded
      ? props.theme.colors.neutral[200]
      : props.theme.colors.neutral[800]};
`;

export const SpinnerSection = styled.a`
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.brand.primary[300]};
`;

export const Image = styled.img``;
