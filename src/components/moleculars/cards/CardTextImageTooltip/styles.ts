import styled from "styled-components";
import {
  defaultBodyMdBold,
  defaultBodySmRegular,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  min-width: 230px;
  padding: ${({ theme }) => theme.spacing(16)};
  border-radius: 16px;
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 230px;
  }
`;

export const Image = styled.img<{
  size?: string;
}>`
  width: 72px;
  height: 72px;
  border-radius: 50%;

  display: block;
  object-fit: cover;
`;

export const Text = styled.p`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.gray30};
`;

export const Value = styled.p`
  ${defaultBodyMdBold}

  color: ${({ theme }) => theme.colors.red30};
`;

export const Title = styled.span`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.red40};
`;

export const InfoLeft = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.gray30};
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
