import { theme as themeShared } from "@ribon.io/shared/styles";
import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import Card from "../Card";

export const InnerCardContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const CardComponent = styled(Card)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(16)};
  }
`;

export const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: "flex-start";
  justify-content: "flex-start";
`;

export const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { iconBackgroundColor: string }) =>
    props.iconBackgroundColor || themeShared.colors.neutral[100]};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  justify-content: center;
`;

export const Title = styled.p`
  ${defaultBodyMdSemibold}

  color: ${(props: { titleColor: string }) =>
    props.titleColor || themeShared.colors.neutral[800]};
`;

export const ChildrenContainer = styled.p`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.neutral[700]};
`;
