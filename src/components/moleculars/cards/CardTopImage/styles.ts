import styled from "styled-components";
import {
  defaultSubtitleSmall,
  defaultTitleSmall,
} from "styles/typography/default";

export const Container = styled.div`
  width: 160px;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 230px;
  }
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;
  display: block;
  object-fit: cover;
`;

export const Text = styled.p`
  ${defaultSubtitleSmall}
  margin-top: 8px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const Value = styled.span`
  ${defaultTitleSmall}
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.green40};
`;
