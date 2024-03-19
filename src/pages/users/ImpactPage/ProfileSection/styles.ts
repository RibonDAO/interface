import styled from "styled-components";

export const Container = styled.div<{
  member?: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.spacing(0, 0, 8, 8)};
  position: relative;
  top: -1px;
  background-color: ${({ theme, member }) =>
    member
      ? theme.colors.brand.tertiary[600]
      : theme.colors.brand.primary[800]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-height: 120px;
    position: static;
  }
`;

export const CenterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-left: calc(14% + 12px);
    position: static;
    justify-content: flex-start;
  }
`;

export const BackgroundShapeLeft = styled.img`
  width: 140px;
  position: absolute;
  top: -56px;
  left: -8%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: auto;
    top: 0;
    left: 5%;
  }
`;

export const BackgroundShapeRight = styled.img`
  width: 130px;
  height: 180px;
  position: absolute;
  right: 0;
  bottom: -40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: auto;
    height: auto;
    top: 0;
  }
`;

export const UserInfo = styled.div`
  margin-bottom: 40px;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: 0;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`;
