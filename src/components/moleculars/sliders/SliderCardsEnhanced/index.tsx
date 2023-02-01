import React, { useEffect, useRef, useState } from "react";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import RoundedArrow from "components/atomics/arrows/RoundedArrow";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";

export type Props = {
  loop?: boolean;
  currentSlide: number;
  onCurrentSlideChange: (slide: number) => void;
  children: JSX.Element[];
  saveStateIdentifier?: string;
  slideWidthOnDesktop?: number;
  resetOnChildrenChange?: boolean;
};

export default function SliderCardsEnhanced({
  loop = false,
  children,
  slideWidthOnDesktop = 287,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useBreakpoint();
  const mounted = useRef(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showLeftSide, setShowLeftSide] = useState(false);

  const calculateSlidesPerViewOnDesktop = () => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      return wrapperWidth / slideWidthOnDesktop;
    }

    return 2.2;
  };

  const getSlidesPerView = () => {
    if (isMobile) return 1.2;

    return calculateSlidesPerViewOnDesktop();
  };

  const MutationPlugin: KeenSliderPlugin = (slider) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        setShowLeftSide(false);
        slider.update();
        slider.track.init(0);
      });
    });
    const config = { childList: true };

    slider.on("created", () => {
      observer.observe(slider.container, config);
    });
    slider.on("destroyed", () => {
      observer.disconnect();
    });
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop,
      mode: "free-snap",
      slides: {
        perView: getSlidesPerView(),
        spacing: 0,
      },
      created() {
        setLoaded(true);
      },
      dragStarted() {
        if (!showLeftSide) setShowLeftSide(true);
      },
      animationStarted() {
        if (!showLeftSide) setShowLeftSide(true);
      },
    },
    [MutationPlugin],
  );

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  return (
    <S.NavigationWrapper ref={wrapperRef}>
      <div
        ref={sliderRef}
        className="keen-slider"
        onDrag={(e) => e.preventDefault()}
      >
        {children.flat().map(
          (component: any) =>
            component && (
              <div
                className="keen-slider__slide"
                style={{ overflow: "visible" }}
                key={`keen_slider___slide_element_${component.key}`}
              >
                {component}
              </div>
            ),
        )}
      </div>
      {loaded && instanceRef.current && (
        <>
          <S.RightSide visible={children.length > 3}>
            <RoundedArrow
              direction="right"
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </S.RightSide>
          <S.LeftSide visible={showLeftSide && children.length > 3}>
            <RoundedArrow
              direction="left"
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />
          </S.LeftSide>
        </>
      )}
    </S.NavigationWrapper>
  );
}
