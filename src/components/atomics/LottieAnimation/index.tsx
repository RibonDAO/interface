import React from "react";
import Lottie from "react-lottie-player";

export type Props = {
  animationData: Record<string, unknown> | undefined;
  width: number;
  height: number;
};

function LottieAnimation({ animationData, width, height }: Props): JSX.Element {
  return (
    <Lottie
      loop
      play
      animationData={animationData}
      style={{ width, height }}
      data-testid="loader"
    />
  );
}

export default LottieAnimation;
