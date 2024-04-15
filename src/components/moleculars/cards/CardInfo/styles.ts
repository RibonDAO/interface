import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export const InnerCardContainer = styled.div`
  width: 100%;
  padding: ${({theme}) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({theme}) => theme.spacing(16)};
  align-items: "flex-start";
  justify-content: "flex-start";
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { iconBackgroundColor: string }) =>
    props.iconBackgroundColor || theme.colors.neutral[100]};
`;


export const Title = styled.p`
  ${defaultBodyMdSemibold}

  color: ${(props: { titleColor: string }) =>
    props.titleColor || theme.colors.neutral[800]};
`;

export const ChildrenContainer = styled.p`
  ${defaultBodySmRegular}
  
  color: ${({theme}) => theme.colors.neutral[700]};
`;
