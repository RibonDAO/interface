import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% + 32px);
  min-height: 322px;
  margin: -26px -16px 32px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[800]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: calc(133% + 80px);
    min-height: 166px;
    margin: 0 calc(-28% - 80px) 32px -28%;
    padding-right: 14%;
    padding-left: 28%;
    justify-content: flex-start;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: calc(136% + 80px);
    min-height: 166px;
    margin: 0 calc(-28% - 80px) 40px -28%;
    padding-right: 14%;
    padding-left: 28%;
    justify-content: flex-start;
  }
`;

export const CenterContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: grid;
    grid-template-columns: 2fr 1fr 3fr;
    column-gap: ${({ theme }) => theme.spacing(40)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 2fr 2fr 4fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    grid-template-columns: 2fr 1fr 4fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopExtraLarge}) {
    grid-template-columns: 3fr 2fr 7fr;
  }
`;

export const BackgroundShapeLeft = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 300px;
    height: 290px;
    left: 80px;
    object-fit: cover;
  }
`;

export const BackgroundShapeRight = styled.img`
  position: absolute;
  top: 56px;
  right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 280px;
    height: 294px;
    top: 0;
    object-fit: cover;
  }
`;
