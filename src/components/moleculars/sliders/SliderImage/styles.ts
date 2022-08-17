import styled from "styled-components";

type NgoImageProps = {
  image: string;
};

export const Container = styled.div`
  width: 344px;
  height: 209px;
  position: relative;
`;

export const NavigationWrapper = styled.div`
  position: relative;
`;

export const SlideImageContainer = styled.div`
  width: 100%;
`;

export const SlideImage = styled.div`
  height: calc(100vh - 16px);
  max-height: 209px;
  padding: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-image: url(${(props: NgoImageProps) => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 344px;
    border-right: 1px solid white;
  }
`;

export const SlideVideo = styled.video`
  min-width: 100%;
  height: calc(100vh - 16px);
  max-height: 209px;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 344px;
    border-right: 1px solid white;
  }
`;

export const PaginationContainer = styled.div`
  width: 36px;
  height: 27px;
  padding: 4px 8px;
  border-radius: 50%;
  position: absolute;
  bottom: 14px;
  left: 50%;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
  transform: translateX(-50%);
`;

export const PaginationNumber = styled.h5`
  text-align: center;
  color: white;
`;
