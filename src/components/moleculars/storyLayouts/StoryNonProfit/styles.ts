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

export const Content = styled.div`
  width: 100%;
  padding: 20px;
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

export type TopFooterRowProps = {
  color: string;
};

export const TopFooterRow = styled.div<TopFooterRowProps>`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 30px;
  padding-bottom: 5px;
  padding-left: 15px;
  border-left: solid 3px ${({ color }) => color};
  display: flex;
  flex-direction: column;
`;

export const BottomFooterRow = styled.div`
  height: 50px;
  display: flex;
`;

export const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
`;

export const NonProfitInfo = styled.div`
  margin-left: 10px;
  display: inline-block;
`;

export const Info = styled.p`
  font-weight: ${({ theme }) => theme.font.semibold};
`;

export const SmallInfo = styled.small``;

export const Icon = styled.img`
  margin-bottom: -2px;
  margin-left: 4px;
`;

export const Title = styled.h3``;

export const Description = styled.p``;
