import styled from "styled-components";

type ContainerProps = {
  backgroundImage: string;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mediumGreen};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RoundLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 150px;
    height: 150px;
    border-radius: 150px;
  }
`;

export const Title = styled.h3`
  margin-left: 3px;
  line-height: 25px;
  text-align: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Subtitle = styled.h3`
  line-height: 25px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;
