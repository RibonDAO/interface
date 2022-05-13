import { Fragment, useEffect, useState } from "react";
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
  const [options, setOptions] = useState({});
  const [slides, setSlides] = useState<JSX.Element[]>([]);
  const [ref, slider] = useKeenSlider<HTMLDivElement>(options);

  useEffect(() => {
    setSlides(children.flat());
    slider.current?.update();
    setOptions({
      mode,
      slides: {
        perView: sliderPerView,
        spacing,
      },
    });
  }, [children]);

  return (
    <S.Container>
      <div ref={ref} className="keen-slider">
        {slides.map((component, idx) => (
          <Fragment key={idx.toString()}>{component}</Fragment>
        ))}
      </div>
    </S.Container>
  );
}

export default Carousel;
