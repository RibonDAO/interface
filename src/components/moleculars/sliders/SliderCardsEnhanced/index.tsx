import React, { useEffect, useRef, useState } from "react";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
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
};

const SAVE_STATE_PREFIX = "slider-cards-enhanced";

const MINIMUM_SLIDES_TO_LOOP = 5;

export default function SliderCardsEnhanced({
  loop = false,
  currentSlide,
  onCurrentSlideChange,
  children,
  saveStateIdentifier,
  slideWidthOnDesktop = 287,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useBreakpoint();
  const mounted = useRef(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const saveState = (s: KeenSliderInstance) => {
    if (saveStateIdentifier) {
      localStorage.setItem(
        `${SAVE_STATE_PREFIX}__${saveStateIdentifier}`,
        String(s.track.details.rel),
      );
    }
  };

  const loadState = () => {
    if (saveStateIdentifier) {
      const index = localStorage.getItem(
        `${SAVE_STATE_PREFIX}__${saveStateIdentifier}`,
      );
      if (index) onCurrentSlideChange(Number(index));
    }
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop,
    mode: "free-snap",
    slides: {
      perView: getSlidesPerView(),
      spacing: 0,
    },
    animationEnded(s) {
      if (mounted.current) onCurrentSlideChange(s.track.details.rel);
    },
    created() {
      setLoaded(true);
      loadState();
    },
    destroyed(s) {
      saveState(s);
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      if (instanceRef.current.track.details.rel !== currentSlide) {
        instanceRef.current.moveToIdx(currentSlide, undefined, {
          duration: 0,
        });
      }
    }
  }, [currentSlide]);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  const renderSlides = () => {
    let elements = children;

    while (elements.length < MINIMUM_SLIDES_TO_LOOP) {
      elements = [...elements, ...children];
    }

    const slides = elements.flat().map(
      (component: any, idx: number) =>
        component && (
          <div className="keen-slider__slide" key={idx.toString()}>
            {component}
          </div>
        ),
    );

    return slides;
  };

  return (
    <S.NavigationWrapper ref={wrapperRef}>
      <div
        ref={sliderRef}
        className="keen-slider"
        onDrag={(e) => e.preventDefault()}
      >
        {renderSlides()}
      </div>
      {loaded && instanceRef.current && (
        <>
          <S.RightSide>
            <RoundedArrow
              direction="right"
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </S.RightSide>
          <S.LeftSide>
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
