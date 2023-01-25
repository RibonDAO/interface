import styled from "styled-components";
import { defaultParagraphSmall } from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  min-width: 230px;
  min-height: 216px;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: left;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 230px;
  }
`;

export const Image = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

export const Title = styled.p`
  ${defaultParagraphSmall}

  color: ${({ theme }) => theme.colors.green40};
`;

export const Text = styled.p`
  ${defaultParagraphSmall}

  text-align: left;
  color: ${({ theme }) => theme.colors.gray30};
`;
