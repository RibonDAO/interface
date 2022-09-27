import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
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
    <div>
      <div ref={ref} className="keen-slider">
        {slides.map(
          (component, idx) =>
            component && (
              <div className="keen-slider__slide" key={idx.toString()}>
                {component}
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default Carousel;
