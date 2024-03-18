import styled from "styled-components";

export const Container = styled.div<{
  member?: boolean;
}>`
  background-color: ${({ theme, member }) =>
    member
      ? theme.colors.brand.tertiary[600]
      : theme.colors.brand.primary[800]};
  width: 100%;
  border-radius: ${({ theme }) => theme.spacing(0, 0, 8, 8)};
  height: 100%;
  position: relative;
  top: -1px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    min-height: 120px;
    position: static;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    justify-content: flex-start;
    padding-left: calc(14% + 12px);
    position: static;
  }
`;

export const BackgroundShapeLeft = styled.img`
  position: absolute;
  top: -56px;
  width: 140px;
  left: -8%;
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    left: 5%;
    width: auto;
    top: 0;
  }
`;

export const BackgroundShapeRight = styled.img`
  position: absolute;
  width: 130px;
  height: 180px;
  right: 0;
  bottom: -40px;
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: auto;
    height: auto;
    top: 0;
  }
`;

export const UserInfo = styled.div`
  position: relative;
  margin-bottom: 40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: 0;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`;
