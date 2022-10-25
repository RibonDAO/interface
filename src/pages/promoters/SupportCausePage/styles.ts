import styled from "styled-components";
import { stylizedHeadingLarge } from "styles/typography/stylized";


export const Container = styled.div`
  width: 100%;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  right: 0;
  bottom: -200px;
`;

export const MainContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 472px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedHeadingLarge}
  margin: 4px 0;
  margin-bottom: 48px;
`;

export const Button = styled.button<{
  outline?: boolean;
}>`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${(props) =>
    props.outline ? props.theme.colors.gray30 : props.theme.colors.orange20};
  border-radius: 4px;
  background-color: ${(props) =>
    props.outline ? props.theme.colors.neutral10 : props.theme.colors.orange20};
  color: ${({ theme }) => theme.colors.gray30};
`;

export const ContainerCarousel = styled.div`
  width: 100%;
`;