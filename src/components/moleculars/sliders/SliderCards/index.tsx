import { useState, useRef, useEffect } from "react";
import { ReactComponent as LeftIcon } from "assets/icons/arrow-left-green.svg";
import { ReactComponent as RightIcon } from "assets/icons/arrow-right-green.svg";
import * as S from "./styles";

export type Props = {
  children: React.ReactNode;
  scrollOffset: number;
};

function SliderCards({ children, scrollOffset }: Props): JSX.Element {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [scrollInTheBeginning, setScrollInTheBeginning] = useState(true);
  const [scrollInTheEnd, setScrollInTheEnd] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const endOfScolling = () => {
    if (sliderRef.current) {
      return sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
    }

    return 0;
  };

  useEffect(() => {
    if (sliderRef.current) {
      setScrollInTheBeginning(sliderRef.current.scrollLeft === 0);
      setScrollInTheEnd(sliderRef.current.scrollLeft === endOfScolling());
    }
  }, [sliderPosition]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setSliderPosition(e.currentTarget.scrollLeft);
  };

  const handleScrollWithClick = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  return (
    <S.SlideCardsContainer>
      <S.LeftSide visible={!scrollInTheBeginning}>
        <S.RoundButton onClick={() => handleScrollWithClick(-scrollOffset)}>
          <LeftIcon />
        </S.RoundButton>
      </S.LeftSide>

      <S.Slider ref={sliderRef} onScroll={handleScroll}>
        {children}
      </S.Slider>

      <S.RightSide visible={!scrollInTheEnd}>
        <S.RoundButton onClick={() => handleScrollWithClick(scrollOffset)}>
          <RightIcon />
        </S.RoundButton>
      </S.RightSide>
    </S.SlideCardsContainer>
  );
}

export default SliderCards;
