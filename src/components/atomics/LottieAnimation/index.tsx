import React, { CSSProperties } from "react";
import Lottie from "react-lottie-player";

export type Props = {
  animationData: Record<string, unknown> | undefined;
  width: number;
  height?: number;
  loop?: boolean;
  style?: CSSProperties;
};

function LottieAnimation({
  animationData,
  width,
  height,
  loop = true,
  style,
}: Props): JSX.Element {
  return (
    <Lottie
      loop={loop}
      play
      animationData={animationData}
      style={{ width, height, ...style }}
      data-testid="loader"
    />
  );
}

export default LottieAnimation;
