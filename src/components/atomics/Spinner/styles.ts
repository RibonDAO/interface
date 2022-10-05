import styled from "styled-components";

type Props = {
  color?: string;
};

export const Container = styled.div`
  display: inline-block;

  svg {
    circle {
      stroke: ${(props: Props) => props.color};
      stroke-dasharray: calc(3.14 * 40);
      transform-origin: 20px 20px 0;
      animation: spinner 4s linear infinite;

      @keyframes spinner {
        0% {
          stroke-dashoffset: 26.4;
          transform: rotate(0deg);
        }

        50% {
          stroke-dashoffset: 125.6;
          transform: rotate(720deg);
        }

        100% {
          stroke-dashoffset: 26.4;
          transform: rotate(1080deg);
        }
      }
    }
  }
`;
