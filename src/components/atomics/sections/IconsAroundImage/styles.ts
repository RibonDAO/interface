import styled from "styled-components";

const ICONS_COUNT = 9;

export const Container = styled.div`
  width: 330px;
  height: 330px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 10px;
  position: relative;
`;

export const Icon = styled.img<{ position: number; isStatic: boolean }>`
  ${({ position, isStatic }) => {
    const angle = (base: number, mult: number) =>
      base + (360 / ICONS_COUNT) * mult;

    const animationName = `outer_orbit_${position}`;

    const minAngle = angle(0, position);
    const midAngle = angle(170, position);
    const maxAngle = angle(360, position);

    if (isStatic) {
      return `
        transform: rotate(${midAngle}deg) translateX(105px) rotate(-${midAngle}deg);
      `;
    }

    return `
      animation: ${animationName} 4s cubic-bezier(0.1, 0.83, 1, 0.3) infinite;

      @keyframes ${animationName} {
        0% {
          transform: rotate(${minAngle}deg) translateX(70px) rotate(-${minAngle}deg);
        }
        50% {
          transform: rotate(${midAngle}deg) translateX(130px) rotate(-${midAngle}deg);
        }
        100% {
          transform: rotate(${maxAngle}deg) translateX(70px) rotate(-${maxAngle}deg);
        }
      }
    `;
  }}

  width: 28px;
  height: 28px;
  position: absolute;
  top: 46%;
  left: 46%;
`;

export const Diamond = styled.div<{ backgroundImage: string }>`
  width: 38%;
  height: 38%;
  border-radius: 10px;
  position: absolute;
  top: 31%;
  left: 31%;
  z-index: 1;
  overflow: hidden;
  background: transparent;
  transform: rotate(-45deg);

  ::before {
    width: 141%;
    height: 141%;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -0;
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
