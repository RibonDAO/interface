import styled from "styled-components";
import { defaultComponentTextSmall } from "styles/typography/default";
import { stylizedHeadingLarge } from "styles/typography/stylized";

export const Container = styled.div``;

export const Button = styled.button<{
  outline?: boolean;
}>`
  width: auto;
  height: 32px;
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) =>
    props.outline
      ? props.theme.colors.green30
      : props.theme.colors.green40};
  border-radius: 4px;
  background-color: ${(props) =>
    props.outline ? props.theme.colors.neutral10 : props.theme.colors.green40};
  color: ${(props) =>
    props.outline ? props.theme.colors.green40 : props.theme.colors.neutral10};
`;

export const ButtonText = styled.p`
  ${defaultComponentTextSmall};
`;

export const FilterCauses = styled.div`
  width: 100%;
`;

export const BodyContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedHeadingLarge}
  margin: 0;
`;

export const NonProfitsContainer = styled.div``;

export const CausesCardContainer = styled.div``;

export const NonProfitsListContainer = styled.div`
  margin-inline: -17px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-inline: 0;
    max-width: 900px;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green30};
  }
`;
