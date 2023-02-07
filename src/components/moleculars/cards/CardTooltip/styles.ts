import styled, { css } from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodySmRegular,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div<{
  size?: string;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 24%;
    height: 100%;
  }

  ${(props) =>
    props.size === "large" &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
        width: 230px;
        min-height: 292px;
      }
    `}
`;

export const Image = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;

  display: block;
  object-fit: cover;
`;

export const Text = styled.p`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.gray30};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-height: 72px;
  }
`;

export const Value = styled.p<{
  textColor?: string;
}>`
  ${defaultBodyMdBold}

  color: ${(props) => props.textColor};
`;

export const Title = styled.span<{
  textColor?: string;
}>`
  ${defaultBodySmRegular}

  color: ${(props) => props.textColor};
`;

export const InfoLeft = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.gray30};
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
