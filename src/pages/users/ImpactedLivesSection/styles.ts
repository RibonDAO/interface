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
    min-height: 164px;
    margin: 0 calc(-28% - 80px) 32px -28%;
    justify-content: flex-start;
    padding-left: 28%;
    width: calc(156% + 80px);
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: grid;
    grid-template-columns: 2fr 1fr 3fr;
    column-gap: ${({ theme }) => theme.spacing(40)};
  }
`;

export const BackgroundShapeLeft = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: none;
  }
`;

export const BackgroundShapeRight = styled.img`
  position: absolute;
  top: 56px;
  right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: none;
  }
`;
