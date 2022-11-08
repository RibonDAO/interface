import styled, { css } from "styled-components";

export const DefaultIcon = css`
  position: absolute;
  top: 47%;
  left: 47%;
  width: 28px;
  height: 28px;
`;

export const Animation = css`
  @keyframes outer_orbit_1 {
    0% {
      transform: rotate(0deg) translateX(50px) rotate(0deg);
    }
    50% {
      transform: rotate(180deg) translateX(150px) rotate(-180deg);
    }
    100% {
      transform: rotate(360deg) translateX(50px) rotate(-360deg);
    }
  }

  @keyframes outer_orbit_2 {
    0% {
      transform: rotate(40deg) translateX(50px) rotate(-40deg);
    }
    50% {
      transform: rotate(220deg) translateX(150px) rotate(-220deg);
    }
    100% {
      transform: rotate(400deg) translateX(50px) rotate(-400deg);
    }
  }

  @keyframes outer_orbit_3 {
    0% {
      transform: rotate(80deg) translateX(50px) rotate(-80deg);
    }
    50% {
      transform: rotate(260deg) translateX(150px) rotate(-260deg);
    }
    100% {
      transform: rotate(440deg) translateX(50px) rotate(-440deg);
    }
  }

  @keyframes outer_orbit_4 {
    0% {
      transform: rotate(120deg) translateX(50px) rotate(-120deg);
    }
    50% {
      transform: rotate(300deg) translateX(150px) rotate(-300deg);
    }
    100% {
      transform: rotate(480deg) translateX(50px) rotate(-480deg);
    }
  }

  @keyframes outer_orbit_5 {
    0% {
      transform: rotate(160deg) translateX(50px) rotate(-160deg);
    }
    50% {
      transform: rotate(340deg) translateX(150px) rotate(-340deg);
    }
    100% {
      transform: rotate(520deg) translateX(50px) rotate(-520deg);
    }
  }

  @keyframes outer_orbit_6 {
    0% {
      transform: rotate(200deg) translateX(50px) rotate(-200deg);
    }
    50% {
      transform: rotate(380deg) translateX(150px) rotate(-380deg);
    }
    100% {
      transform: rotate(560deg) translateX(50px) rotate(-560deg);
    }
  }

  @keyframes outer_orbit_7 {
    0% {
      transform: rotate(240deg) translateX(50px) rotate(-240deg);
    }
    50% {
      transform: rotate(420deg) translateX(150px) rotate(-420deg);
    }
    100% {
      transform: rotate(600deg) translateX(50px) rotate(-600deg);
    }
  }

  @keyframes outer_orbit_8 {
    0% {
      transform: rotate(280deg) translateX(50px) rotate(-280deg);
    }
    50% {
      transform: rotate(460deg) translateX(150px) rotate(-460deg);
    }
    100% {
      transform: rotate(640deg) translateX(50px) rotate(-640deg);
    }
  }

  @keyframes outer_orbit_9 {
    0% {
      transform: rotate(320deg) translateX(50px) rotate(-320deg);
    }
    50% {
      transform: rotate(500deg) translateX(150px) rotate(-500deg);
    }
    100% {
      transform: rotate(680deg) translateX(50px) rotate(-680deg);
    }
  }
`;

export const Container = styled.div`
  ${Animation}
  width: 400px;
  height: 400px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export const Icon = styled.img<{ animationName?: string }>`
  ${DefaultIcon}
  animation: ${({ animationName }) =>
    animationName} 4s cubic-bezier(.1,.83,1,.3) infinite;
`;

export const Diamond = styled.div<{ backgroundImage: string }>`
  width: 130px;
  height: 130px;
  background: red;
  position: absolute;
  z-index: 1;
  top: 34%;
  left: 34%;
  transform: rotate(-45deg);
  overflow: hidden;
  border-radius: 10px;

  ::before {
    content: "";
    position: absolute;
    z-index: -0;
    width: 141%;
    height: 141%;
    left: 50%;
    top: 50%;
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
