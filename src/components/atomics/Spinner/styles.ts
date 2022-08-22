import styled from "styled-components";

type Props = {
  color?: string;
};

export const Container = styled.div`
  display: inline-block;

  svg {
    circle {
      stroke: ${(props: Props) => props.color};
      transform-origin: 20px 20px 0;
      animation: spinner 4s linear infinite;
      stroke-dasharray: calc(3.14 * 40);

      @keyframes spinner {
        0% {
          transform: rotate(0deg);
          stroke-dashoffset: 26.4;
        }

        50% {
          transform: rotate(720deg);
          stroke-dashoffset: 125.6;
        }

        100% {
          transform: rotate(1080deg);
          stroke-dashoffset: 26.4;
        }
      }
    }
  }
`;
