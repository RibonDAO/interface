import styled from "styled-components";
import {
  stylizedHeadingLarge,
  stylizedTitleLarge,
} from "styles/typography/stylized";
import {
  defaultParagraphSmall,
  defaultComponentTextSmall,
} from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const ContentContainer = styled.div`
  max-width: 472px;
  margin-top: 24px;
  border-radius: 8px;
`;

export const DonateContainer = styled.div`
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 16px 32px -2px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const GivingContainer = styled.div`
  margin-bottom: 24px;
  padding: 0 34px;
  display: grid;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
    grid-template-columns: 1fr 1fr;
  }
`;

export const ContributionContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin-right: 30px;
    margin-bottom: 24px;
  }
`;

export const CommunityAddContainer = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 100%;
    margin-top: 0;
    margin-left: 30px;
  }
`;

export const CommunityAddText = styled.p`
  ${defaultParagraphSmall};
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CommunityAddValue = styled.p`
  ${stylizedTitleLarge};
  color: ${({ theme }) => theme.colors.orange20};
`;

export const CommunityAddButton = styled(ButtonComponent)`
  margin-top: 8px;
  padding: 4px;
  border-color: ${({ theme }) => theme.colors.orange40};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.orange40};
`;

export const DonateButton = styled(ButtonComponent)`
  border-color: ${({ theme }) => theme.colors.orange40};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.orange20};
  color: ${({ theme }) => theme.colors.orange40};
`;

export const BackgroundImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    right: 0;
    bottom: -200px;
  }
`;

export const Title = styled.h1`
  ${stylizedTitleLarge};
  margin: 4px 0;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.gray40};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedHeadingLarge};
  }
`;

export const Button = styled.button<{
  outline?: boolean;
}>`
  width: auto;
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) =>
      props.outline
        ? props.theme.colors.orange20
        : props.theme.colors.orange40};
  border-radius: 4px;
  background-color: ${(props) =>
    props.outline ? props.theme.colors.neutral10 : props.theme.colors.orange40};
  color: ${(props) =>
    props.outline ? props.theme.colors.orange40 : props.theme.colors.neutral10};
`;

export const ButtonText = styled.p`
  ${defaultComponentTextSmall};
`;

export const CausesContainer = styled.div`
  width: 100%;
`;

export const SupportImage = styled.img`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
