import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

import step1 from "./assets/STEP1.json";
import step2 from "./assets/STEP2.json";
import step3 from "./assets/STEP3.json";
import * as S from "./styles";

export type Props = {
  rangeSize: number;
  step: number;
  value: number;
};

type Segment = {
  index: number;
  path: number[];
  direction: "forward" | "backward";
};

export default function Lottie3Steps({
  rangeSize,
  value,
  step,
}: Props): JSX.Element {
  const [animationFrame1, setAnimationFrame1] = useState<[number, number]>([
    0, 0,
  ]);
  const [animationFrame2, setAnimationFrame2] = useState<[number, number]>([
    0, 0,
  ]);
  const [animationFrame3, setAnimationFrame3] = useState<[number, number]>([
    0, 0,
  ]);

  const [animationPlay1, setAnimationPlay1] = useState(false);
  const [animationPlay2, setAnimationPlay2] = useState(false);
  const [animationPlay3, setAnimationPlay3] = useState(false);

  const [animationDisplay1, setAnimationDisplay1] = useState("none");
  const [animationDisplay2, setAnimationDisplay2] = useState("none");
  const [animationDisplay3, setAnimationDisplay3] = useState("none");

  const showAnimation1 = (startFrame = 0, endFrame = 150) => {
    setAnimationDisplay1("block");
    setAnimationFrame1([startFrame, endFrame]);
    setAnimationPlay1(true);
  };

  const showAnimation2 = (startFrame = 0, endFrame = 150) => {
    setAnimationDisplay2("block");
    setAnimationFrame2([startFrame, endFrame]);
    setAnimationPlay2(true);
  };

  const showAnimation3 = (startFrame = 0, endFrame = 150) => {
    setAnimationDisplay3("block");
    setAnimationFrame3([startFrame, endFrame]);
    setAnimationPlay3(true);
  };

  const hideAnimation1 = () => {
    setAnimationDisplay1("none");
    setAnimationFrame1([0, 0]);
  };

  const hideAnimation2 = () => {
    setAnimationDisplay2("none");
    setAnimationFrame2([0, 0]);
  };

  const hideAnimation3 = () => {
    setAnimationDisplay3("none");
    setAnimationFrame3([0, 0]);
  };

  const minimumValue = rangeSize < 2 * step ? 0 : step;
  const maximumValue = Math.floor(rangeSize / step) * step;

  const removeDups = (arr: number[]): number[] => [...new Set(arr)];

  const steps = removeDups([
    minimumValue,
    Math.floor(maximumValue / 3) % step !== 0
      ? minimumValue
      : Math.floor(maximumValue / 3),
    Math.floor((2 * maximumValue) / 3) % step !== 0
      ? minimumValue
      : Math.floor((2 * maximumValue) / 3),
    maximumValue,
  ]);

  const [currentSegment, setCurrentSegment] = useState<Segment>({
    index: 0,
    path: [0, 150],
    direction: "forward",
  });

  useEffect(() => {
    const direction = value > currentSegment.index ? "forward" : "backward";

    setCurrentSegment({
      index: value,
      path: [0, 150],
      direction,
    });
  }, [value]);

  const handle4Steps = () => {
    if (value === steps[0]) {
      if (currentSegment.direction === "backward") {
        hideAnimation1();
        hideAnimation2();
        hideAnimation3();
      }
    }
    if (value === steps[1]) {
      if (currentSegment.direction === "forward") showAnimation1();
      else hideAnimation1();
    }
    if (value > steps[1] && value < steps[2]) {
      if (currentSegment.direction === "forward") showAnimation1(149, 150);
      else hideAnimation2();
    }
    if (value === steps[2]) {
      if (currentSegment.direction === "forward") showAnimation2();
      else hideAnimation2();
    }
    if (value > steps[2] && value < steps[3]) {
      if (currentSegment.direction === "forward") showAnimation2(149, 150);
      else hideAnimation3();
    }
    if (value === steps[3]) {
      if (currentSegment.direction === "forward") showAnimation3();
    }
  };
  const handle3Steps = () => {
    if (value === steps[0])
      if (currentSegment.direction === "backward") {
        hideAnimation1();
        hideAnimation2();
      }

    if (value === steps[1]) {
      if (currentSegment.direction === "forward") showAnimation1();
      else hideAnimation2();
    }
    if (value > steps[1] && value < steps[2]) {
      if (currentSegment.direction === "forward") showAnimation1(149, 150);
      else hideAnimation2();
    }
    if (value === steps[2]) {
      if (currentSegment.direction === "forward") showAnimation2();
    }
  };

  const handle2Steps = () => {
    if (value === steps[0]) {
      if (currentSegment.direction === "backward") hideAnimation1();
    }
    if (value === steps[1]) {
      if (currentSegment.direction === "forward") showAnimation1();
    }
  };

  useEffect(() => {
    switch (steps.length) {
      case 4:
        return handle4Steps();
      case 3:
        return handle3Steps();
      case 2:
        return handle2Steps();
      default:
        return handle4Steps();
    }
  }, [currentSegment]);

  return (
    <S.container>
      <S.lottieContainer>
        <Lottie
          animationData={step1}
          style={{ width: 360, height: 360, display: animationDisplay1 }}
          loop={false}
          play={animationPlay1}
          segments={animationFrame1}
        />
      </S.lottieContainer>
      <S.lottieContainer>
        <Lottie
          animationData={step2}
          style={{ width: 360, height: 360, display: animationDisplay2 }}
          loop={false}
          play={animationPlay2}
          segments={animationFrame2}
        />
      </S.lottieContainer>
      <S.lottieContainer>
        <Lottie
          animationData={step3}
          style={{ width: 360, height: 360, display: animationDisplay3 }}
          loop={false}
          play={animationPlay3}
          segments={animationFrame3}
        />
      </S.lottieContainer>
    </S.container>
  );
}
