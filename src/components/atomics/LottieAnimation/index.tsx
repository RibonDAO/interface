import { CSSProperties } from "react";
import Lottie from "react-lottie-player";

export type Props = {
  animationData: Record<string, unknown> | undefined;
  width: number | string;
  height: number | string;
  style?: CSSProperties;
  startFrame?: number;
};

function LottieAnimation({
  animationData,
  width,
  height,
  style,
  startFrame,
}: Props): JSX.Element {
  return (
    <Lottie
      loop
      play
      animationData={animationData}
      style={{ width, height, ...style }}
      data-testid="loader"
      goTo={startFrame}
    />
  );
}

export default LottieAnimation;
