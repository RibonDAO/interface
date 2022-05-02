import React, { Fragment } from "react";
import { useKeenSlider } from "keen-slider/react";
import * as S from "./styles";
import "keen-slider/keen-slider.min.css";

export type Props = {
  sliderPerView?: number;
  spacing?: number;
  children: JSX.Element[];
  mode?: "free" | "free-snap" | "snap";
};
function Carousel({
  sliderPerView = 2,
  spacing = 15,
  children,
  mode = "snap",
}: Props): JSX.Element {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: sliderPerView,
      spacing,
    },
    mode,
  });
  return (
    <S.Container>
      <div ref={ref} className="keen-slider">
        {children.map((component, idx) => (
          <Fragment key={idx.toString()}>{component}</Fragment>
        ))}
      </div>
    </S.Container>
  );
}

export default Carousel;
