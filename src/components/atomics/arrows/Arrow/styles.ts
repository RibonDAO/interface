import styled from "styled-components";

type Props = {
  disabled: boolean;
};

const Arrow = styled.svg<Props>`
  width: 28px;
  height: 56px;
  border-radius: 100% / 50%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  position: absolute;
  top: 50%;
  background-color: ${({ disabled }) =>
    disabled ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.6)"};
  cursor: pointer;
  fill: ${({ fill }) => fill};
  transform: translateY(-50%);
`;

export const ArrowRightImage = styled(Arrow)`
  right: 0;
`;

export const ArrowLeftImage = styled(Arrow)`
  left: 0;
`;
