import styled from "styled-components";

export type ContainerProps = {
  image: string;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
`;

export type ContentProps = {
  hasProfileData: boolean;
};

export const Content = styled.div<ContentProps>`
  width: 100%;
  padding: 20px;
  padding-bottom: ${({ hasProfileData }) => (hasProfileData ? "70px" : "20px")};
  position: absolute;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 80%) 0%,
    rgba(0, 0, 0, 70%) 50%,
    rgba(0, 0, 0, 0%) 100%
  );
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 30px;
  padding-bottom: 5px;
  padding-left: 15px;
  border-left: solid 3px ${({ theme }) => theme.colors.neutral10};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3``;

export const Description = styled.p``;
